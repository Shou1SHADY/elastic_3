import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateManufacturingSpecs = async (userIdea: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "AI Service Unavailable: Please ensure API_KEY is set.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a senior manufacturing engineer at Elastic, a custom rubber keychain and patch factory. 
      The user has an idea for a product: "${userIdea}".
      
      Generate a technical manufacturing brief in a strict, futuristic, monospaced format. 
      Include:
      1. Recommended Material (e.g., Soft PVC, Silicone, TPU)
      2. Estimated Dimensions (based on typical keychains if not specified)
      3. Layering Technique (2D, 3D, Printed)
      4. Color Suggestions (Pantone approximation)
      5. Mold Complexity Rating (Low/Medium/High)
      
      Keep it concise, professional, and formatted like a terminal output.`,
    });

    return response.text || "Could not generate specifications.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to manufacturing mainframe.";
  }
};
