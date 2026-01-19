import  express from "express";
import { getUserById, getuserResume, Loginuser, registeruser } from "../controllers/usercontroller.js";
import protect from "../middleware/authmiddleware.js";
const userrouter=express.Router();
userrouter.post('/register',registeruser);
userrouter.post('/login',Loginuser);
userrouter.get('/data',protect,getUserById);
userrouter.get('/resumes',protect,getuserResume)
export default userrouter;