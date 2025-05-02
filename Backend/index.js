import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import recruiterRoutes from './routes/recruiterRoutes.js';
import userRoutes from './routes/userRoutes.js';
import upload from './routes/upload.js';

dotenv.config();
const app = express();

// Common Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/recruiters', recruiterRoutes)
app.use('/api/users', userRoutes);
app.use('/api/upload', upload);

const PORT = process.env.PORT || 8001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on the ${PORT}`);
    })
}).catch((error) => {
    console.log("Database Connection Error", error);
    process.exit(1);
})
