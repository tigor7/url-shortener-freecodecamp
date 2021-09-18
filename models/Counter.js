import mongoose  from 'mongoose';
const {Schema, model} = mongoose;

const counterSchema = new Schema({
    counter: Number,
}, {collection: 'counter'});

export default model('Counter', counterSchema);