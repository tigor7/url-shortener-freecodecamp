import Counter from'./models/Counter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const counter = new Counter({
    counter: 1
});
counter.save((err, doc) => {
    if (err) console.log(err);
    return console.log('counter created');
});