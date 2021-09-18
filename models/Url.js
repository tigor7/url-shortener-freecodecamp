import mongoose  from 'mongoose';
const {Schema, model} = mongoose;

const urlSchema = new Schema({
    original_url: String,
    short_url: Number
});

export default  model('Url', urlSchema);