import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {fileSize: 5 * 1024 * 1024}, // 5MB Limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
           "application/pdf",
           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
        } else {
        cb(new Error("Only .pdf and .docx files are allowed"), false);
        }
    },
});

export default upload;