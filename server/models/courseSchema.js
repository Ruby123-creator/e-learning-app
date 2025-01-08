import mongoose from 'mongoose';


const schema  = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    thumbnailImage:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    createdBy:{
        type:String,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
})

export const CourseSchema = mongoose.model('course',schema);