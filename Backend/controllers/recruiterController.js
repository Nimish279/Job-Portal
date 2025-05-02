import {Recruiter} from '../models/Recruiter.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginRecruiter = async (req, res) => {
    const {email, password} = req.body;
    try{
        const recruiter = await Recruiter.findOne({email});
        if(!recruiter) return res.status(404).json({message: 'Recruiter not found'});

        const isMatch = await bcrypt.compare(password, recruiter.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: recruiter._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token, recruiter});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

export const registerRecruiter = async (req, res) => {
    try {
        const {recruiterName, jobTitle, email, phone, alternateContact, linkedIn, password, companyName, website, street, city, state, postalCode, industryType, registrationNumber, companyPanCardNumber, companyLogo, companyPanCardFile} = req.body;
    
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
            companyLogo,
            companyPanCardFile,
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