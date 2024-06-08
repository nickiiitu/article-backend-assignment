import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import articleRoutes from './routes/article.routes';
import uploadRoutes from './routes/upload.routes';
import authorRoutes from './routes/author.routes';
import dotenv from "dotenv";

const app = express();
dotenv.config()
// const mongoUri:string =typeof process.env.mongo_uri === "string" && process.env.mongo_uri
const mongoUri: string = typeof process.env.mongo_uri === "string" ? process.env.mongo_uri : "";

mongoose.connect(mongoUri).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/author', authorRoutes);
app.use('/api/v1/files', uploadRoutes);



export default app;
