import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    bio: string;
    password:string
}

const AuthorSchema: Schema = new Schema({
    name: { type: String, required: true,unique:true },
    bio: { type: String, required: true },
    password:{ type: String, required: true }
});

export default mongoose.model<IAuthor>('Author', AuthorSchema);
