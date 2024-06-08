import { check } from 'express-validator';

export const articleValidationRules = [
    check('title').notEmpty().withMessage('Title is required'),
    check('content').notEmpty().withMessage('Content is required'),
    check('author').notEmpty().withMessage('Author is required')
];
