import express from "express"
import upload from "../configs/multer.js";

import protect from "../middleware/authmiddleware.js"
import { createResume, deleteResume, getpublicresumebyId, GetResumebyid, updateResume } from "../controllers/resumecontroller.js";
const resumeRouter=express.Router();
resumeRouter.post('/create',protect,createResume);
resumeRouter.put('/update',upload.single('image'),protect,updateResume);
resumeRouter.delete('/delete/:resumeId',protect,deleteResume);
resumeRouter.get('/get/:resumeId',protect,GetResumebyid);
resumeRouter.get('/public/:resumeId',getpublicresumebyId);

export default resumeRouter