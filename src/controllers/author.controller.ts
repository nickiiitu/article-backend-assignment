import { Request, Response } from 'express';
import Author from '../models/Author';
import bcrypt from "bcrypt"
import { generateJwtToken, isValidPassword } from '../utils/validation';

// Create an author
export const createAuthor = async (req: Request, res: Response) => {

    try {
        const { password, ...authorData } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(" kjzboijdbiughuih");
        
        const author = await Author.create({ ...authorData, password: hashedPassword });
        res.status(201).json(author);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};
//login author
 export const login =async (req: Request, res: Response) => {
    const { name, password } = req.body;
    try {
        const user = await Author.findOne({ name });
        console.log(user,"user");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
        const isValid:boolean =  await isValidPassword(password,hashedPassword);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const userid:string=user._id?user._id as string:""
        const token=generateJwtToken(userid);
        res.status(201).json({ token ,user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



// Get all authors
export const getAuthor = async (req: Request, res: Response) => {

    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

// Get one author
export const getAuthoreById = async (req: Request, res: Response) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Update an author
export const updateAuthore = async (req: Request, res: Response) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an author
export const deleteAuthore = async (req: Request, res: Response) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author deleted' });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};
