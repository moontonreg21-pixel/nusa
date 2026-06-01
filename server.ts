import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { PROVINCES } from "./src/data";

dotenv.config({ path: '.env.local' });
dotenv.config();

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const SYSTEM_INSTRUCTION = [
  "Anda adalah pakar kuliner pusaka Nusantara (Indonesian Culinary Expert).",
  "Berikan jawaban yang kaya detail sejarah bumbu, filosofi makanan, resep autentik, bahan pengganti, serta tips memasak modern.",
  "Jawab dalam bahasa Indonesia yang hangat, informatif, dan praktis.",
  "Gunakan format Markdown ringkas dengan judul dan daftar jika membantu."
].join(" ");

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const STOP_WORDS = new Set([
  "yang", "dengan", "untuk", "dalam", "secara", "tolong", "jelaskan",
  "bagaimana", "mengapa", "kenapa", "adalah", "atau", "saya", "anda",
  "resep", "cara", "singkat", "kalimat", "khas", "makanan", "masakan"
]);

function tokenize(text: string) {
  return normalizeText(text)
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word));
}

function createLocalCulinaryAnswer(prompt: string, reason?: string) {
  const normalizedPrompt = normalizeText(prompt);
  const promptTokens = new Set(tokenize(prompt));
  const scoredProvinces = PROVINCES.map((province) => {
    let score = 0;
    const provinceName = normalizeText(province.name);
    const dishName = normalizeText(province.dishName);

    if (normalizedPrompt.includes(provinceName)) score += 12;
    if (normalizedPrompt.includes(dishName)) score += 12;

    for (const token of tokenize(`${province.name} ${province.dishName} ${province.territory}`)) {
      if (promptTokens.has(token)) score += 4;
    }

    for (const token of tokenize(`${province.description} ${province.history} ${province.ingredients.join(" ")} ${province.recommendedRecipe.steps.join(" ")}`)) {
      if (promptTokens.has(token)) score += 1;
    }

    return { province, score };
  }).sort((a, b) => b.score - a.score);

  const matchedProvince = scoredProvinces[0]?.score > 0 ? scoredProvinces[0].province : undefined;

  if (matchedProvince) {
    const ingredients = matchedProvince.ingredients.slice(0, 4).map((item) => `- ${item}`).join("\n");
    const steps = matchedProvince.recommendedRecipe.steps.slice(0, 4).map((step, index) => `${index + 1}. ${step}`).join("\n");

    return [
      `### Panduan otomatis: ${matchedProvince.dishName}`,
      reason ? `Saat ini saya memakai mode panduan lokal karena ${reason}.` : "Saya memakai data resep internal Nusa Culinary untuk memberi jawaban cepat.",
      "",
      `**Asal rasa:** ${matchedProvince.name} (${matchedProvince.territory}). ${matchedProvince.description}`,
      "",
      `**Kunci sejarah:** ${matchedProvince.history}`,
      "",
      "**Bahan utama yang perlu disiapkan:**",
      ingredients,
      "",
      "**Langkah praktis awal:**",
      steps,
      "",
      "Untuk hasil terbaik, jaga api kecil-menengah, koreksi garam bertahap, dan cicipi setelah bumbu benar-benar matang agar rasa rempah tidak langu."
    ].join("\n");
  }

  const suggestions = PROVINCES
    .slice(0, 5)
    .map((province) => `- ${province.dishName} dari ${province.name}`)
    .join("\n");

  return [
    "### Asisten Kuliner AI siap membantu",
    reason ? `Saat ini saya memakai mode panduan lokal karena ${reason}.` : "Saya siap menjawab otomatis dari data kuliner internal aplikasi.",
    "",
    "Saya adalah koki AI Nusantara untuk masakan Indonesia, bumbu, rempah, resep, teknik memasak, dan cerita makanan tradisional.",
    "",
    "Coba tanyakan nama hidangan, daerah, teknik memasak, substitusi bahan, atau sejarah kuliner yang ingin Anda pelajari.",
    "",
    "**Contoh topik yang tersedia:**",
    suggestions
  ].join("\n");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "1mb" }));

  // Initialize Gemini client on the server with user-agent for telemetry
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for culinary AI queries
  app.post("/api/kuliner-ai", async (req, res) => {
    try {
      const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
          text: createLocalCulinaryAnswer(prompt, "GEMINI_API_KEY belum dikonfigurasi"),
          mode: "local"
        });
      }

      try {
        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          }
        });

        res.json({ text: response.text, mode: "gemini", model: GEMINI_MODEL });
      } catch (error: any) {
        console.error("Gemini API Error:", error);
        res.status(200).json({
          text: createLocalCulinaryAnswer(prompt, "layanan Gemini sedang tidak tersedia"),
          mode: "local",
          warning: error.message || "Gemini API unavailable"
        });
      }
    } catch (error: any) {
      console.error("AI Endpoint Error:", error);
      res.status(500).json({ error: error.message || "Gagal menghubungi asisten kuliner AI." });
    }
  });

  app.get("/api/kuliner-ai", (_req, res) => {
    res.status(405).json({ error: "Method not allowed. Use POST." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
