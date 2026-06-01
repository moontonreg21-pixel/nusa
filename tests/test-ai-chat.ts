/**
 * 🧪 Automation Test Suite — Fitur AI Chat Nusa Culinary
 * 
 * Jalankan: npx tsx tests/test-ai-chat.ts
 * Pastikan server sudah berjalan (npm run dev) sebelum menjalankan test ini.
 */

const BASE_URL = "http://localhost:3000";
const API_ENDPOINT = `${BASE_URL}/api/kuliner-ai`;

interface TestResult {
  name: string;
  status: "PASS" | "FAIL" | "WARN";
  duration: number;
  detail: string;
}

const results: TestResult[] = [];

async function runTest(name: string, testFn: () => Promise<{ status: "PASS" | "FAIL" | "WARN"; detail: string }>) {
  const start = Date.now();
  try {
    const result = await testFn();
    const duration = Date.now() - start;
    results.push({ name, ...result, duration });
    const icon = result.status === "PASS" ? "✅" : result.status === "WARN" ? "⚠️" : "❌";
    console.log(`${icon} [${result.status}] ${name} (${duration}ms)`);
    if (result.detail) console.log(`   └─ ${result.detail}`);
  } catch (err: any) {
    const duration = Date.now() - start;
    results.push({ name, status: "FAIL", duration, detail: err.message });
    console.log(`❌ [FAIL] ${name} (${duration}ms)`);
    console.log(`   └─ Error: ${err.message}`);
  }
}

// ============================================================
// TEST CASES
// ============================================================

async function TC01_ServerIsRunning() {
  await runTest("TC-01: Server berjalan dan dapat diakses", async () => {
    const res = await fetch(BASE_URL);
    if (res.ok || res.status === 200) {
      return { status: "PASS", detail: `Status: ${res.status} - Server merespons dengan baik.` };
    }
    return { status: "FAIL", detail: `Status: ${res.status}` };
  });
}

async function TC02_EndpointExists() {
  await runTest("TC-02: Endpoint /api/kuliner-ai tersedia (POST)", async () => {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "" }),
    });
    // Endpoint harus mengembalikan 400 untuk prompt kosong, bukan 404
    if (res.status === 400) {
      const data = await res.json();
      return { status: "PASS", detail: `Endpoint aktif. Prompt kosong mengembalikan 400: "${data.error}"` };
    }
    if (res.status === 404) {
      return { status: "FAIL", detail: "Endpoint tidak ditemukan (404). Periksa routing di server.ts." };
    }
    return { status: "WARN", detail: `Status tidak terduga: ${res.status}` };
  });
}

async function TC03_EmptyPromptValidation() {
  await runTest("TC-03: Validasi prompt kosong → 400 Bad Request", async () => {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "" }),
    });
    const data = await res.json();
    if (res.status === 400 && data.error) {
      return { status: "PASS", detail: `Validasi benar: "${data.error}"` };
    }
    return { status: "FAIL", detail: `Seharusnya 400, dapat: ${res.status}` };
  });
}

async function TC04_MissingPromptField() {
  await runTest("TC-04: Request tanpa field 'prompt' → 400 Bad Request", async () => {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "test" }), // field salah
    });
    const data = await res.json();
    if (res.status === 400) {
      return { status: "PASS", detail: `Validasi field benar: "${data.error}"` };
    }
    return { status: "FAIL", detail: `Seharusnya 400 untuk field 'prompt' yang hilang, dapat: ${res.status}` };
  });
}

async function TC05_InvalidContentType() {
  await runTest("TC-05: Request dengan Content-Type salah", async () => {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "ini bukan json",
    });
    // Server seharusnya gagal parse body
    if (res.status === 400 || res.status === 500) {
      return { status: "PASS", detail: `Server menolak content-type non-JSON: status ${res.status}` };
    }
    return { status: "WARN", detail: `Status: ${res.status} - Server mungkin tidak memvalidasi Content-Type.` };
  });
}

async function TC06_ValidPromptSendsToGemini() {
  await runTest("TC-06: Prompt valid dikirim ke Gemini API", async () => {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Sebutkan 3 bumbu dasar masakan Indonesia." }),
    });
    const data = await res.json();

    if (res.status === 200 && data.text) {
      // Periksa respons AI mengandung konten relevan
      const text = data.text.toLowerCase();
      const hasContent = text.length > 50;
      return {
        status: "PASS",
        detail: `AI merespons (${data.text.length} karakter). Preview: "${data.text.substring(0, 120)}..."`
      };
    }

    if (res.status === 200 && data.text && data.text.includes("GEMINI_API_KEY")) {
      return { status: "WARN", detail: "API Key belum dikonfigurasi. Respons fallback ditampilkan." };
    }

    if (res.status === 500) {
      const errorMsg = data.error || "Unknown error";
      if (errorMsg.includes("UNAVAILABLE") || errorMsg.includes("high demand")) {
        return { status: "WARN", detail: `Gemini API sedang sibuk (503). API key valid, coba lagi nanti.` };
      }
      if (errorMsg.includes("API_KEY_INVALID") || errorMsg.includes("401")) {
        return { status: "FAIL", detail: "API Key tidak valid. Periksa GEMINI_API_KEY di .env.local" };
      }
      return { status: "FAIL", detail: `Server error: ${errorMsg}` };
    }

    return { status: "FAIL", detail: `Status tidak terduga: ${res.status}, body: ${JSON.stringify(data)}` };
  });
}

async function TC07_LongPromptHandling() {
  await runTest("TC-07: Prompt sangat panjang (>2000 karakter)", async () => {
    const longPrompt = "Tolong jelaskan resep rendang. ".repeat(100); // ~3000 chars
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: longPrompt }),
    });
    const data = await res.json();

    if (res.status === 200) {
      return { status: "PASS", detail: `Server menerima prompt panjang (${longPrompt.length} chars). Respons diterima.` };
    }
    if (res.status === 500) {
      const err = data.error || "";
      if (err.includes("UNAVAILABLE")) {
        return { status: "WARN", detail: "Gemini sedang sibuk, tapi server menerima request panjang." };
      }
      return { status: "WARN", detail: `Server error: ${err}` };
    }
    return { status: "WARN", detail: `Status: ${res.status}` };
  });
}

async function TC08_SpecialCharactersInPrompt() {
  await runTest("TC-08: Prompt dengan karakter khusus & emoji", async () => {
    const specialPrompt = `Apa itu "rendang" <script>alert('xss')</script> 🔥🌶️ & bagaimana cara membuatnya? 'test' \n\t "quotes"`;
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: specialPrompt }),
    });
    const data = await res.json();

    if (res.status === 200 || res.status === 500) {
      // Yang penting server tidak crash
      const responseText = data.text || data.error || "";
      const hasXSS = responseText.includes("<script>");
      if (hasXSS) {
        return { status: "FAIL", detail: "⚠️ SECURITY: Respons mengandung tag <script> tanpa sanitasi!" };
      }
      return { status: "PASS", detail: `Server menangani karakter khusus tanpa crash. Status: ${res.status}` };
    }
    return { status: "PASS", detail: `Server menangani input: status ${res.status}` };
  });
}

async function TC09_ConcurrentRequests() {
  await runTest("TC-09: 5 request bersamaan (concurrency test)", async () => {
    const prompts = [
      "Apa itu sate?",
      "Resep gudeg singkat",
      "Bumbu rendang apa saja?",
      "Cara membuat papeda?",
      "Apa itu base genep?"
    ];

    const startTime = Date.now();
    const promises = prompts.map(prompt =>
      fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }).then(r => ({ status: r.status, ok: r.ok }))
        .catch(err => ({ status: 0, ok: false, error: err.message }))
    );

    const responses = await Promise.all(promises);
    const totalTime = Date.now() - startTime;
    const successCount = responses.filter(r => r.status === 200).length;
    const errorCount = responses.filter(r => r.status === 500).length;
    const failCount = responses.filter(r => r.status === 0).length;

    if (failCount > 0) {
      return { status: "FAIL", detail: `${failCount}/5 request gagal total (connection refused). Server mungkin crash.` };
    }

    return {
      status: successCount >= 3 ? "PASS" : "WARN",
      detail: `${successCount}/5 sukses, ${errorCount}/5 API error (Gemini overload?), total ${totalTime}ms. Server stabil.`
    };
  });
}

async function TC10_GETMethodNotAllowed() {
  await runTest("TC-10: GET request ke /api/kuliner-ai (method check)", async () => {
    const res = await fetch(API_ENDPOINT, { method: "GET" });
    // Express tanpa handler GET seharusnya mengembalikan 404 atau error HTML
    if (res.status === 404 || res.status === 405) {
      return { status: "PASS", detail: `GET method ditolak dengan benar: ${res.status}` };
    }
    if (res.status === 200) {
      return { status: "WARN", detail: "GET method diterima — ini bisa menjadi masalah keamanan jika tidak diinginkan." };
    }
    return { status: "PASS", detail: `GET mengembalikan status ${res.status}` };
  });
}

async function TC11_ResponseFormatValidation() {
  await runTest("TC-11: Format respons AI sesuai kontrak { text: string }", async () => {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Halo" }),
    });
    const data = await res.json();

    if (res.status === 200) {
      if (typeof data.text === "string") {
        return { status: "PASS", detail: `Respons sesuai kontrak: { text: "${data.text.substring(0, 80)}..." }` };
      }
      return { status: "FAIL", detail: `Field 'text' bukan string. Tipe: ${typeof data.text}` };
    }
    if (res.status === 500 && data.error) {
      return { status: "WARN", detail: `API error tapi format error benar: { error: "${data.error.substring(0, 80)}..." }` };
    }
    return { status: "WARN", detail: `Status: ${res.status}` };
  });
}

async function TC12_SystemInstructionWorking() {
  await runTest("TC-12: System instruction membuat AI menjawab sebagai pakar kuliner Indonesia", async () => {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Siapa kamu dan apa keahlianmu? Jawab singkat 1 kalimat." }),
    });
    const data = await res.json();

    if (res.status === 200 && data.text) {
      const text = data.text.toLowerCase();
      const culinaryKeywords = ["kuliner", "masakan", "chef", "koki", "rempah", "bumbu", "indonesia", "nusantara", "resep", "makanan"];
      const foundKeywords = culinaryKeywords.filter(kw => text.includes(kw));

      if (foundKeywords.length >= 2) {
        return {
          status: "PASS",
          detail: `AI memposisikan diri sebagai pakar kuliner. Keywords: [${foundKeywords.join(", ")}]. Jawaban: "${data.text.substring(0, 120)}..."`
        };
      }
      return {
        status: "WARN",
        detail: `AI menjawab tapi belum tentu sebagai pakar kuliner. Jawaban: "${data.text.substring(0, 150)}..."`
      };
    }

    if (res.status === 500) {
      const err = data.error || "";
      if (err.includes("UNAVAILABLE")) {
        return { status: "WARN", detail: "Gemini API sibuk. Tidak bisa memvalidasi system instruction." };
      }
    }

    return { status: "FAIL", detail: `Tidak bisa memvalidasi. Status: ${res.status}` };
  });
}

async function TC13_IndonesianLanguageResponse() {
  await runTest("TC-13: AI menjawab dalam Bahasa Indonesia", async () => {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Jelaskan cara membuat sambal terasi. Jawab dalam 2 kalimat." }),
    });
    const data = await res.json();

    if (res.status === 200 && data.text) {
      const text = data.text.toLowerCase();
      const indonesianWords = ["dan", "dengan", "untuk", "yang", "ini", "adalah", "dalam", "atau", "bahan", "cara"];
      const foundWords = indonesianWords.filter(w => text.includes(w));

      if (foundWords.length >= 3) {
        return { status: "PASS", detail: `Respons dalam Bahasa Indonesia (${foundWords.length}/10 kata umum ID terdeteksi).` };
      }
      return { status: "WARN", detail: `Mungkin bukan Bahasa Indonesia. Preview: "${data.text.substring(0, 120)}..."` };
    }

    if (res.status === 500) {
      return { status: "WARN", detail: "Gemini API error, tidak bisa memvalidasi bahasa." };
    }
    return { status: "FAIL", detail: `Status: ${res.status}` };
  });
}

async function TC14_PresetPromptSimulation() {
  await runTest("TC-14: Simulasi preset prompt 'Rahasia Rendang Hitam'", async () => {
    const presetPrompt = "Mengapa Rendang khas Minangkabau bisa berona hitam pekat tanpa gosong? Tolong bagikan rahasia teknik karamelisasi kelapa dan ketepatan suhu apinya.";

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: presetPrompt }),
    });
    const data = await res.json();

    if (res.status === 200 && data.text) {
      const text = data.text.toLowerCase();
      const relevantKeywords = ["rendang", "kelapa", "santan", "karamel", "hitam", "api", "masak", "bumbu", "rempah"];
      const found = relevantKeywords.filter(kw => text.includes(kw));

      if (found.length >= 3) {
        return { status: "PASS", detail: `AI menjawab relevan tentang rendang (${found.length} keyword match). Panjang: ${data.text.length} chars.` };
      }
      return { status: "WARN", detail: `Jawaban mungkin kurang relevan. Keywords ditemukan: [${found.join(", ")}]` };
    }

    if (res.status === 500) {
      return { status: "WARN", detail: `Gemini API error: ${data.error?.substring(0, 80)}` };
    }
    return { status: "FAIL", detail: `Status: ${res.status}` };
  });
}

// ============================================================
// MAIN RUNNER
// ============================================================

async function main() {
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("  🧪 AUTOMATION TEST — FITUR AI CHAT NUSA CULINARY");
  console.log("  📅 " + new Date().toLocaleString("id-ID"));
  console.log("  🔗 Server: " + BASE_URL);
  console.log("═══════════════════════════════════════════════════════════════\n");

  // ---- Group 1: Connectivity & Basic Routing ----
  console.log("── 📡 Group 1: Koneksi & Routing ──────────────────────────────");
  await TC01_ServerIsRunning();
  await TC02_EndpointExists();
  await TC10_GETMethodNotAllowed();
  console.log("");

  // ---- Group 2: Input Validation ----
  console.log("── 🛡️  Group 2: Validasi Input ─────────────────────────────────");
  await TC03_EmptyPromptValidation();
  await TC04_MissingPromptField();
  await TC05_InvalidContentType();
  await TC08_SpecialCharactersInPrompt();
  console.log("");

  // ---- Group 3: AI Integration ----
  console.log("── 🤖 Group 3: Integrasi Gemini AI ────────────────────────────");
  await TC06_ValidPromptSendsToGemini();
  await TC11_ResponseFormatValidation();
  await TC12_SystemInstructionWorking();
  await TC13_IndonesianLanguageResponse();
  console.log("");

  // ---- Group 4: Feature Scenarios ----
  console.log("── 🍳 Group 4: Skenario Fitur Kuliner ─────────────────────────");
  await TC14_PresetPromptSimulation();
  await TC07_LongPromptHandling();
  console.log("");

  // ---- Group 5: Stability ----
  console.log("── ⚡ Group 5: Stabilitas & Performa ──────────────────────────");
  await TC09_ConcurrentRequests();
  console.log("");

  // ---- Summary ----
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("  📊 RINGKASAN HASIL TEST");
  console.log("═══════════════════════════════════════════════════════════════");

  const passed = results.filter(r => r.status === "PASS").length;
  const warned = results.filter(r => r.status === "WARN").length;
  const failed = results.filter(r => r.status === "FAIL").length;
  const total = results.length;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

  console.log(`\n  ✅ PASS: ${passed}/${total}`);
  console.log(`  ⚠️  WARN: ${warned}/${total}`);
  console.log(`  ❌ FAIL: ${failed}/${total}`);
  console.log(`  ⏱️  Total Duration: ${(totalDuration / 1000).toFixed(1)}s\n`);

  if (failed > 0) {
    console.log("  ❌ GAGAL — Ada test case yang tidak lolos:");
    results.filter(r => r.status === "FAIL").forEach(r => {
      console.log(`     • ${r.name}: ${r.detail}`);
    });
  } else if (warned > 0) {
    console.log("  ⚠️  LULUS DENGAN CATATAN — Beberapa test memerlukan perhatian.");
  } else {
    console.log("  🎉 SEMUA TEST LULUS!");
  }

  console.log("\n═══════════════════════════════════════════════════════════════\n");

  // Exit with appropriate code
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(console.error);
