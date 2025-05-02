import {User} from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid Credentials'});

        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token, user: existingUser});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const exists = await User.findOne({email});
        if(exists) return res.status(400).json({message: 'User already exists'});

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashed});
        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
    } catch(err){
        res.status(500).json({error: err.message});
    }
};