// import jwt from 'jsonwebtoken'

// const protect=async(req,res,next)=>{
// const token =req.headers.authorization;
// if(!token){
//     return res.status(401).json({message:'uauthorized'});
// }
// try{
//     const decoded=jwt.verify(token,process.env.JWT_SECRET)
//     req.userId=decoded.userId;
//     next();
// }
// catch (error){
//     return res.status(401).json({message:'unauthorized'});
// }
// }
// export default protect;



import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "unauthorized" });
    }

    // Bearer <token>
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default protect;
