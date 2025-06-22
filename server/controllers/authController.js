import jwt from "jsonwebtoken";

import User from "../models/User.js";

const generateToken=(user)=>{
return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'});
};

// Register controller

export const register=async(req,res)=>{
    try{
    const {name,email,password,role}=req.body;
    console.log(name,email,password,role);
    
    
    
    const exists = await User.findOne({email});
    console.log(exists);
    
    if(exists) return res.status(400).json({message:'Email already exists'},{sucess:false});
    const user =await User.create({name,email,password,role});
    const token=generateToken(user);

    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:"None",
    });
    res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
}

// Login
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });
  
      const token = generateToken(user);
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
  
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  
  // Get current user
  export const getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
