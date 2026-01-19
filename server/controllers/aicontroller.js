// //controller for enhasncing a rsume professional summary 
// //POST:/api/ai/enhance-pro-sum

// import { response } from "express";
// import ai from "../configs/AI.js";
// import Resume from "../configs/models/resume.js";

// export const enhanceProfessionalSummary= async (req,res)=>{
//     try{

//     const {userContent}=req.body;
//     if(!userContent){
//         return res.status(400).json({message:'Missing required fields'})

//     }
//     const Airesponse=await ai.chat.completions.create({
//          model: process.env.OPENAI_MODEL,
//     messages: [
//         {   role: "system",
//             content: "You are an expert in resume writing Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else"
//         },
//         {
//             role: "user",
//             content: userContent,
//         },
//     ],
        
//     })
//     const enhancedcontent=Airesponse.choices[0].message.content;
//     return res.status(200).json({enhancedcontent})
//     }
//     catch (error){
//        return res.status(400).json({message:error.message})
//     }
// }


// //controller fro enhancing job description
// //POST:/api/ai/enhance-job-desc
// export const enhanceJobdesscription= async (req,res)=>{
//     try{

//     const {userContent}=req.body;
//     if(!userContent){
//         return res.status(400).json({message:'Missing required fields'})

//     }
//     const Airesponse=await ai.chat.completions.create({
//          model: process.env.OPENAI_MODEL,
//     messages: [
//         {   role: "system",
//             content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else."
//         },
//         {
//             role: "user",
//             content: userContent,
//         },
//     ],
        
//     })
//     const enhancedcontent=Airesponse.choices[0].message.content;
//     return res.status(200).json({enhancedcontent})
//     }
//     catch (error){
//        return res.status(400).json({message:error.message})
//     }
// }
// //controller for uploading resume to the database
// //POST:/api/ai/upload-resume
// export const uploadresume= async (req,res)=>{
//     try{
//     const {resumeText,title}=req.body;
//     const userId=req.userId;
//     if(!resumeText){
//         return status(400).json({message:'Missing required fields'})
//     }

//     const systemprompt="You are an expert ai  Agent to extract data from resume"
//     const userprompt=` extract data from this resume:${resumeText}  provide data in the following JSON format with no additional text befor or after:
//     {personal_info:{
//         image:{type:String,default:''},
//         full_name:{type:String,default:''},
//         profession:{type:String,default:''},
//         email:{type:String,default:''},
//          phone:{type:String,default:''},
//           location:{type:String,default:''},
//            linkedin:{type:String,default:''},
//             website:{type:String,default:''},
//     },
//     experience:[
//         {
//             company:{type:String},
//             position:{type:String},
//             start_date:{type:String},
//             end_date:{type:String},
//             description:{type:String},
//             is_current:{type:Boolean},
//         }
//     ],
//     project:[
//         {
//             name:{type:String},
//             type:{type:String},
//             description:{type:String},
            
//         }
//     ],
//     education:[
//         {
//             institution:{type:String},
//             degree:{type:String},
//             field:{type:String},
//             graduation_date:{type:String},
//             gpa:{type:String},
            
//         }
//     ]

// },
// {timestamps:true, minimize:false}
// )}`
    
//     const Airesponse=await ai.chat.completions.create({
//          model: process.env.OPENAI_MODEL,
//     messages: [
//         {   role: "system",
//             content: systemprompt,
//         },
//         {
//             role: "user",
//             content: userprompt,
//         },
//     ],
//         response_format:{type:'json_object'}
//     })
//     const extracteddata=Airesponse.choices[0].message.content;
//     const parsedData=JSON.parse(extracteddata)

//     const newresume = await Resume.create({userId,title,...parsedData})
//     return res.json({resumeId:newresume._id})
//     }
//     catch (error){
//        return res.status(400).json({message:error.message})
//     }
// }



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


