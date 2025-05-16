import mongoose from "mongoose";
import { Recruiter } from "./Recruiter.js";

const jobSchema=new mongoose.Schema({
    hiringWorkflow: [{
        name: String,
        status: { type: String, enum: ['Pending', 'In-progress','Completed'], default: 'Pending' },
        dueDate: Date
      }],
    candidates:{type:mongoose.Schema.ObjectId,ref:"User"},
    recruiter:{type:mongoose.Schema.ObjectId,ref:"Recruiter"},
    ctc:{type:String,required:true},
    requiredDocuments:{type:String,required:true},
    eligibilityCriteria:{type:String,required:true},
    skillsRequired:{type:String,required:true},
    jobRole:{type:String,required:true},
    jobDescription:{type:String,required:true},
    attachedDocs: [{
      fileName: String,
      fileType: String,
      fileSize: Number,
      url: String, // e.g., local path or cloud storage URL
      uploadedAt: { type: Date, default: Date.now }
    }],
    location:{type:String,required:true}

})


export const Job=mongoose.model('Job',jobSchema)