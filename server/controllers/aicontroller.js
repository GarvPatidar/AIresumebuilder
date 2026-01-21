

// controller for enhancing a resume professional summary
// POST:/api/ai/enhance-pro-sum

import ai from "../configs/AI.js";
import Resume from "../configs/models/resume.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || !userContent.trim()) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const Airesponse = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Enhance the professional summary into 1-2 ATS-friendly sentences. Return only text.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedcontent = Airesponse.choices[0].message.content;

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

    const Airesponse = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Enhance the job description into 1-2 ATS-friendly sentences using action verbs. Return only text.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedcontent = Airesponse.choices[0].message.content;

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

    const systemprompt =
      "You are an AI agent that extracts structured resume data. Return ONLY valid JSON.";

    const userprompt = `
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
  "experience": [],
  "project": [],
  "education": []
}

Resume Text:
${resumeText}
`;

    const Airesponse = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemprompt },
        { role: "user", content: userprompt },
      ],
      response_format: { type: "json_object" },
    });

    const extracteddata = Airesponse.choices[0].message.content;
    const parsedData = JSON.parse(extracteddata);

    const newresume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    return res.status(201).json({ resumeId: newresume._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


