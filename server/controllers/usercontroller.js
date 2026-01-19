// //POST:/api/user/register

// import User from "../configs/models/user.js";
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import Resume from "../configs/models/resume.js";

// //controller for user registration



// const generatetoken=(userId)=>{
//     const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
//     return token;
// }
// export const registeruser=async(req,res)=>{
// try{
// const{name,email,password}=req.body;
// //check if required field are present
// if(!name || !email || !password){
//     return res.status(400).json({message:'missing required field'})

// }
// const user=await User.findOne({email})
// if(user){
//     return res.status(400).json({message:'user already exists'})
// }
// //create new user
// const hashedpassword=await bcrypt.hash(password,10)
// const newuser=await User.create({
//     name,email,password:hashedpassword
// })

// //returns ucces messagge
// const token=generatetoken(newuser._id)
// newuser.password=undefined;
// return res.status(201).json({message:'user created successfully',token,user:newuser})

// }
// catch(error){

// return res.status(400).json({message:error.message})
// }
// }
// //controller for user login
// //POST:/api/user/login



// export const Loginuser=async(req,res)=>{
// try{
// const{email,password}=req.body;
// //check user exist or not
// const user=await User.findOne({email})
// if(!user){
//     return res.status(400).json({message:'Invalid email or password'})
// }

// //check if password is correct
// if(!user.comparePassword(password)){
//     return res.status(400).json({message:'Invalid email or password'})
// }
// //return succes message
// const token=generatetoken(user._id)
// user.password=undefined;
// return res.status(200).json({message:'user Login succesfully',token,user})

// }
// catch(error){

// return res.status(400).json({message:error.message})
// }
// }


// //controller for getting user by id
// //GET:? /api/users/data
// export const getUserById=async(req,res)=>{
//     try{
// const userId=req.userId;
// //check if user exist 
// const user=await User.findById(userId)
// if(!user){
//     return res.status(404).json({message:'user not found'})
// }

//     //return user
//     user.password=undefined;
//     return res.status(200).json({user})
// }
//     catch(error){
//         return res.status(400).json({message: error.message})

//     }
// }

// //controller for getting user resumes 
// //get//api/usets/resumes

// export const getuserResume=async(req,res)=>{
//     try{
//      const userId=req.userId;
//      //return user resume
//      const resumes=await Resume.find({userId})
//      return res.status(200).json({resumes})
//     }
//     catch(error){

// return res.status(400).json({message:error.message})

//     }
// }

// //get resume by id public
// //GET:/api/resumes/public

// //controoler for updating a resume
// //PUT:/api/resumes/update



// POST:/api/user/register

import User from "../configs/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../configs/models/resume.js";

// generate JWT token
const generatetoken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// controller for user registration
export const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "missing required field" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    const token = generatetoken(newuser._id);
    newuser.password = undefined;

    return res.status(201).json({
      message: "user created successfully",
      token,
      user: newuser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for user login
// POST:/api/user/login
export const Loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // password check (safe way)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generatetoken(user._id);
    user.password = undefined;

    return res.status(200).json({
      message: "user Login succesfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for getting user by id
// GET:/api/users/data
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId, "-password -__v");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for getting user resumes
// GET:/api/users/resumes
export const getuserResume = async (req, res) => {
  try {
    const userId = req.userId;

    const resumes = await Resume.find({ userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
