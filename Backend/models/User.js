import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["Seeker", "Recruiter"],
        default: "Seeker",
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    university: { type: String },
    city: { type: String },
    degree: { type: String },
    github: { type: String },
    about: { type: String },
    appliedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;  // Exclude password from output
            return ret;
        }
    }
});

export const User = mongoose.model("User", userSchema);