/**
 * Types representing provinces, culinary specialties, and regions.
 */

export interface ProvinceData {
  id: string;
  name: string;
  territory: 'SUMATERA' | 'JAWA' | 'SULAWESI' | 'PAPUA' | 'MALUKU' | 'KALIMANTAN' | 'NUSA TENGGARA' | 'BALI';
  description: string;
  dishName: string;
  imageUrl: string;
  ingredients: string[];
  history: string;
  recommendedRecipe: {
    prepTime: string;
    cookTime: string;
    servings: string;
    steps: string[];
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}
