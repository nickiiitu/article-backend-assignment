import { check } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

export const articleValidationRules = [
    check('title').notEmpty().withMessage('Title is required'),
    check('content').notEmpty().withMessage('Content is required'),
];

export const isValidPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        const isValid = await bcrypt.compare(password, hashedPassword);
        return isValid;
    } catch (error) {
        console.error('Error validating password:', error);
        return false;
    }
};

export const generateJwtToken=(id:string):string=>{

    const secret=process.env.jwt?process.env.jwt :""
    const token = jwt.sign({ userId:id }, secret, { expiresIn:"1h"})
return token
}