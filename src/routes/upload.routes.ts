import express from 'express';
import { handleFileUpload, downloadFile, uploadFile } from '../controllers/upload.controller';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/upload', authenticateJWT, uploadFile, handleFileUpload);
router.get('/download/:fileName', authenticateJWT, downloadFile);

export default router;
