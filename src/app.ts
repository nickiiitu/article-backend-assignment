import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import articleRoutes from './routes/article.routes';
import uploadRoutes from './routes/upload.routes';

const app = express();

mongoose.connect('mongodb://localhost:27017/webapi-service').then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/api/articles', articleRoutes);
app.use('/api/files', uploadRoutes);



export default app;
