import { Request, Response } from 'express';
import Article from '../models/Article';
import { validationResult } from 'express-validator';

// Create a new article
interface IRequest extends Request{
    user?:any
}
export const createArticle = async (req: IRequest, res: Response) => {
    try {
        req.body.author=req.user.userId;
        const article = new Article(req.body);
        await article.save();
        res.status(201).json(article);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Read articles with pagination
export const getArticles = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const articles = await Article.find()
            .populate('author')
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
        res.json(articles);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Read a single article
export const getArticleById = async (req: Request, res: Response) => {
    try {
        const article = await Article.findById(req.params.id).populate('author');
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Update an article
export const updateArticle = async (req: Request, res: Response) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an article
export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json({ message: 'Article deleted' });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};
