import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    email:{
        type:String,
        requird:true,
        unique:true,
        lowercase:true
    },
    password:
    {
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        enum: ['user', 'admin', 'operator'],
        default:'user',
    },
isVerified:{
    type:Boolean,
    default:false,
}
},{ timestamps:true});

// Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Compare password
  userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
  };
  
  export default mongoose.model('User', userSchema);