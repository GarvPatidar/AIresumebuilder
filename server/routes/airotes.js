// import express from "express"
// import protect from "../middleware/authmiddleware";
// import { enhanceJobdesscription, enhanceProfessionalSummary } from "../controllers/aicontroller.js";
// import { updateResume } from "../controllers/resumecontroller.js";

// const aiRouter =express.Router();
// aiRouter.post('/enhance-pro-sum',protect,enhanceProfessionalSummary)
// aiRouter.post('/enhance-job-des',protect,enhanceJobdesscription)
// aiRouter.post('/upload-resume',protect,updateResume)

// export default aiRouter



import express from "express";
import protect from "../middleware/authmiddleware.js";

import {
  enhanceJobdesscription,
  enhanceProfessionalSummary
} from "../controllers/aicontroller.js";

import { updateResume } from "../controllers/resumecontroller.js";

const aiRouter = express.Router();

aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-des", protect, enhanceJobdesscription);
aiRouter.post("/upload-resume", protect, updateResume);

export default aiRouter;
