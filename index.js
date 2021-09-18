import express from 'express';
import mongoose from'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import path from 'path';

const app = express();

//Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
app.get('/', (req, res) => {
    const __dirname = path.resolve();
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

import urlRoutes from './routes/urls.js';
app.use('/api', urlRoutes);

app.listen(8000, () => {
    console.log('server is running on port 8000');
});