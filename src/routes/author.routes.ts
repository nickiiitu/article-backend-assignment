import express from 'express';
import {
    createAuthor,
    getAuthor,
    getAuthoreById,
    updateAuthore,
    deleteAuthore,
    login
} from '../controllers/author.controller';

const router = express.Router();

router.post('/', createAuthor);
router.post('/login', login);
router.get('/', getAuthor);
router.get('/:id', getAuthoreById);
router.put('/:id', updateAuthore);
router.delete('/:id',deleteAuthore);

export default router;
