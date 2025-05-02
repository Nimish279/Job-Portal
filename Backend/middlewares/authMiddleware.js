import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


export const isRecruiter = (req, res, next) => {
    if (req.user.role !== "Recruiter") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

export const isSeeker = (req, res, next) => {
    if (req.user.role !== "Seeker") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};