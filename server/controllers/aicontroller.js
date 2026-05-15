

import genAI from "../configs/AI.js";
import Resume from "../configs/models/resume.js";

const generateWithFallback = async (prompt, isJson = false) => {
  let initialModel = process.env.OPENAI_MODEL || "gemini-1.5-flash";
  initialModel = initialModel.trim().replace(/^["']|["']$/g, '');
  
  const modelsToTry = [
    initialModel, 
    "gemini-1.5-flash",
    "gemini-2.0-flash", 
    "gemini-2.5-flash", 
    "gemini-flash-latest", 
    "gemini-pro-latest"
  ];
  let lastError;

  for (const m of modelsToTry) {
    try {
      const config = { model: m };
      // gemini-pro (1.0) doesn't officially support structured JSON MIME type, others do
      if (isJson && m !== "gemini-pro") {
         config.generationConfig = { responseMimeType: "application/json" };
      }
      const model = genAI.getGenerativeModel(config);
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.log(`[AI Fallback] Model ${m} failed:`, err.message);
      lastError = err;
      // If it's a 404 model not found, 400 Bad Request, or 429 Quota Exceeded, try the next model
      const msg = err.message.toLowerCase();
      if (msg.includes("404") || msg.includes("not found") || msg.includes("not supported") || msg.includes("429") || msg.includes("quota")) {
         continue; 
      }
      throw err; 
    }
  }
  
  // If we reach here, all models failed. Let's fetch the list of available models to see what's wrong.
  try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.OPENAI_API_KEY}`);
      const data = await response.json();
      if (data.error) {
          throw new Error(`Google API Key Error: ${data.error.message} (Status: ${data.error.status})`);
      }
      const modelNames = data.models ? data.models.map(m => m.name).join(", ") : "None";
      throw new Error(`Models failed. Available models for your key: ${modelNames}`);
  } catch (fetchErr) {
      if (fetchErr.message.includes("Google API Key Error") || fetchErr.message.includes("Available models")) {
          throw fetchErr;
      }
      throw new Error(`${lastError.message} | Diagnostic fetch failed: ${fetchErr.message}`);
  }
};


// controller for enhancing a resume professional summary
// POST:/api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || !userContent.trim()) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `You are an expert in resume writing. Enhance the following professional summary into 1-2 ATS-friendly sentences. Return only text.\n\n${userContent}`;
    const enhancedcontent = await generateWithFallback(prompt, false);

    return res.status(200).json({ enhancedcontent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for enhancing job description
// POST:/api/ai/enhance-job-desc
export const enhanceJobdesscription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || !userContent.trim()) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `Enhance the following job description into 1-2 ATS-friendly sentences using action verbs. Return only text.\n\n${userContent}`;
    const enhancedcontent = await generateWithFallback(prompt, false);

    return res.status(200).json({ enhancedcontent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for uploading resume to the database
// POST:/api/ai/upload-resume
export const uploadresume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `You are an AI agent that extracts structured resume data. Return ONLY valid JSON.
Extract resume data in this JSON format:

{
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "professional_summary": "",
  "skills": [],
  "experience": [],
  "project": [],
  "education": []
}

Resume Text:
${resumeText}
`;

    let extracteddata = await generateWithFallback(prompt, true);
    
    // Clean markdown if present
    const match = extracteddata.match(/\{[\s\S]*\}/);
    if (match) {
        extracteddata = match[0];
    }
    
    const parsedData = JSON.parse(extracteddata);
    
    // Unwrap if wrapped in a parent property
    const finalData = parsedData.resume || parsedData.resumeData || parsedData.data || parsedData;

    const newresume = await Resume.create({
      userId,
      title,
      ...finalData,
    });

    return res.status(201).json({ resumeId: newresume._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


