import mongoose from 'mongoose';

const recruiterSchema = new mongoose.Schema({
    recruiterName: {
        type: String,
        required: true,
    },
    jobTitle: {
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
    },
    alternateContact: {
        type: String,
    },
    linkedIn: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    companyAddress: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postalCode: {
            type: String,
        }
    },
    industryType: {
        type: String,
    },
    registrationNumber: {
        type: String,
    },
    companyPanCardNumber: {
        type: String,
    },
    companyLogo: {
        type: String,
    },
    companyPanCardFile: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Seeker", "Recruiter"],
        default: "Recruiter",
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    }
}, {
    timestamps: true,
})

export const Recruiter = mongoose.model("Recruiter", recruiterSchema);