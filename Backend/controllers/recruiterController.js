import {Recruiter} from '../models/Recruiter.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Job } from '../models/Job.js';
import { Internship } from '../models/Internship.js';

export const loginRecruiter = async (req, res) => {
    const {email, password} = req.body;
    try{
        const recruiter = await Recruiter.findOne({email});
        if(!recruiter) return res.status(404).json({message: 'Recruiter not found'});

        const isMatch = await bcrypt.compare(password, recruiter.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: recruiter._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 1 * 60 * 60 * 1000, // 1 hour but in cookie form
          });
        res.status(200).json({success:true,message:"Login successfully"});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

export const registerRecruiter = async (req, res) => {
    try {
        const {recruiterName, jobTitle, email, phone, alternateContact, linkedIn, password, companyName, website, street, city, state, postalCode, industryType, registrationNumber, companyPanCardNumber} = req.body;
    
        const existingRecruiter = await Recruiter.findOne({email});
        if(existingRecruiter){
            return res.status(400).json({message: 'Recruiter already exists'});
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newRecruiter = new Recruiter({
            recruiterName,
            jobTitle,
            email,
            phone,
            alternateContact,
            linkedIn,
            password: hashedPassword,
            companyName,
            website,
            companyAddress:{
                street,
                city,
                state,
                postalCode,
            },
            industryType,
            registrationNumber,
            companyPanCardNumber,
        });
    
        await newRecruiter.save();
    
        res.status(201).json({
            message: "Recruiter registered Successfully",
            recruiter: {
                id: newRecruiter._id,
                recruiterName: newRecruiter.recruiterName,
                email: newRecruiter.email,
                companyName: newRecruiter.companyName,
                status: newRecruiter.status,
            },
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({message: "Server error during registration", error});
    }

}

export const getProfile = async (req, res) => {
    try{
        const recruiter = req.recruiter;
        res.status(200).json({recruiter, message: "Recruiter Profile Fetched Successfully"});
    } catch(error){
        console.error("Error fetching ", error);
        res.status(500).json({message: "Server error while fetching profile"})
    }
}

export const recruiterLogout=async (req,res) => {
    try {
        res.clearCookie('token',{
             httpOnly: true,
            secure: true,
            sameSite: "Strict",
        })
        res.status(200).json({message:"Logout Sucessfull"})
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error);
    }
}


export const postJob = async(req,res)=>{
    try {
         const {
            hiringWorkflow,
            jobRole,
            ctc,
            experience,
            requiredDocuments,
            qualifications,
            eligibilityCriteria,
            skillsRequired,
            jobDescription,
            jobType,
            location
        } = req.body
    //Testing Purposes postman
    //     const attachedDocs=req.body.attachedDocs.map(file=>({
    //     fileName:file.originalName,
    //     fileType:file.mimeType,
    //     fileSize:file.size,
    //     url:`uploads/${file.originalName}`,
    //     uploadedAt: new Date()
    //   }))

    
    //   const attachedDocs=req.files.map(file=>({
    //     fileName:file.originalName,
    //     fileType:file.mimeType,
    //     fileSize:file.size,
    //     url:`uploads/${file.originalName}`,
    //     uploadedAt: new Date()
    //   }))




      const recruiter=req.recruiter
      const newJob=await Job.create({
        recruiter:recruiter._id,
        hiringWorkflow,
        jobRole,
        ctc,
        experience,
        requiredDocuments,
        qualifications,
        eligibilityCriteria,
        skillsRequired,
        jobDescription,
        jobType,
        location
      })
    res.status(201).json({ message: "Job created successfully", job: newJob });  
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error)
    }    
}

export const seeCandidates=async (req,res) => {
    try {
        const jobId=req.params.id
        if(!jobId) return res.status(500).json({message:"No jobId mentioned"})
        const candidates=await Job.findById(jobId).populate('candidates')
        console.log(candidates)
        if(candidates.length){
            res.status(203).json({message:"No Candidates Yet",candidates:[]})
        }
        res.status(200).json({success:true,candidates})

    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error)
    }
}

export const updateJob=async (req,res) => {
    try {
        const jobId=req.params.id
        const {hiringWorkflow,
            jobRole,
            ctc,
            requiredDocuments,
            eligibilityCriteria,
            skillsRequired,
            jobDescription,
            location}=req.body
        const job=await Job.findById(jobId)
        if(job===null){
            return res.status(500).json({error:"Job not Found"})
        }

        
    if (jobRole) job.jobRole = jobRole;
    if (ctc) job.ctc = ctc;
    if (requiredDocuments) job.requiredDocuments = requiredDocuments;
    if (eligibilityCriteria) job.eligibilityCriteria = eligibilityCriteria;
    if (skillsRequired) job.skillsRequired = skillsRequired;
    if (jobDescription) job.jobDescription = jobDescription;
    if (hiringWorkflow) {
      job.hiringWorkflow = typeof hiringWorkflow === "string"
        ? JSON.parse(hiringWorkflow)
        : hiringWorkflow;
    }
    if (location) job.location = location;

    const updatedJob = await job.save();
        
    return res.status(200).json({ success: true, job: updatedJob });
    } catch (error) {
          res.status(500).json({error:error.message})
        console.log(error)
    }
} 

export const postInternship = async (req, res) => {
  try {
    const {
      internshipRole,
      stipendAmount,
      stipendType,
      skillsRequired,
      internshipDuration,
      internshipType,
      location,
      eligibilityCriteria
    } = req.body;

    const recruiter = req.recruiter;

    const newInternship = await Internship.create({
      recruiter: recruiter._id,
      internshipRole,
      stipendAmount,
      stipendType,
      skillsRequired,
      internshipDuration,
      internshipType,
      location,
      eligibilityCriteria
    });

    res.status(201).json({ message: "Internship created successfully", internship: newInternship });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteJob=async (req,res) => {
    try {
        const jobId=req.params.id
        const job=await Job.findByIdAndDelete(jobId)

        res.status(200).json({message:"Job Posting Deleted Successfully",
            job,
            success:true})

    } catch (error) {
          res.status(500).json({error:error.message})
        console.log(error)
    }
}

export const updateJobDocs=async (req,res) => {
    try {
        const jobId=req.params.id
        const job=await Job.findById(jobId)
        const attachedDocs=req.files.map(files=>({
            fileName:files.originalName,
            fileSize:files.size,
            fileType:files.mimeType,
            url:`upload/${files.originalName}`
        }))
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error)
    }
}

export const myJobs=async (req,res) => {
    try {
        const recruiter=req.recruiter
        const jobs=await Job.find({recruiter:recruiter._id})
        if(jobs.length===0){
            res.status(203).json({message:"No Jobs Posted by you"})
        }
        res.status(200).json({success:true,jobs})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error);
    }
}