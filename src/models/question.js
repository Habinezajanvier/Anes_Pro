import mongoose, { Schema } from 'mongoose';

const Question = new Schema({
  title: String,
  answer: String
});

export default mongoose.model('Question', Question);
