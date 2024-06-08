import mongoose, { Schema, Document } from 'mongoose';
import { IAuthor } from './Author';

export interface IArticle extends Document {
    title: string;
    content: string;
    author: IAuthor['_id'];
    imageUrl: string;
    videoUrl: string;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    imageUrl: { type: String },
    videoUrl: { type: String },
});

export default mongoose.model<IArticle>('Article', ArticleSchema);
