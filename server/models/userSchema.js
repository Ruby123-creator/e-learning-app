import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        default:"User",

    },
    subscription:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
   

},
{
    timestamps:true,
}
)


export const UserSchema = mongoose.model("User",userSchema);