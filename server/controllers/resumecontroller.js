

// controller for creating a new resume
import Resume from "../configs/models/resume.js";
import imagekit from "../configs/imagekit.js";
import fs from "fs";

// POST:/api/user/resume
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res.status(201).json({
      message: "Resume Created succcesfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE:/api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res.status(200).json({
      message: "Resume deleted succcesfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET:/api/resumes/get
export const GetResumebyid = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne(
      { userId, _id: resumeId },
      "-__v -createdAt -updatedAt"
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET public resume
export const getpublicresumebyId = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      public: true,
      _id: resumeId,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT:/api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const UserId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy; 
    if(typeof resumeData==='string'){
      resumeDataCopy=await JSON.parse(resumeData)
    }
    else{
      resumeDataCopy=structuredClone(resumeData)
    }
    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const Response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      resumeDataCopy.personal_info.image = Response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId: UserId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    return res.status(200).json({
      message: "saved succesfully",
      resume,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

