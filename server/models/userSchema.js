import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  class: {
    type: String, 
    enum: ["VI", "VII", "VIII", "IX", "X", "XI", "XII"], 
  },
  status: {
    type: String,
    default: "active",
  },
  isAdmin: {
    type: Boolean,
    default: false, 
  },
  adminStatus: {
    type: Boolean,
    default: false, 
  },
},
{
  timestamps: true,
});
export const UserSchema = mongoose.model("User",userSchema);