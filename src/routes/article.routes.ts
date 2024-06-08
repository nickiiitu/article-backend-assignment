import express from 'express';
import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from '../controllers/article.controller';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { articleValidationRules } from '../utils/validation';

const router = express.Router();

router.post('/', authenticateJWT, articleValidationRules, createArticle);
router.get('/', authenticateJWT, getArticles);
router.get('/:id', authenticateJWT, getArticleById);
router.put('/:id', authenticateJWT, updateArticle);
router.delete('/:id', authenticateJWT, deleteArticle);

export default router;
