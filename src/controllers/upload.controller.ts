import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export const uploadFile = upload.single('file');

export const handleFileUpload = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(201).json({ filePath: req.file.path });
};

export const downloadFile = (req: Request, res: Response) => {
    const fileName = req.params.fileName;
    const directoryPath = path.join(__dirname, '../../uploads/');
    res.download(directoryPath + fileName);
};
