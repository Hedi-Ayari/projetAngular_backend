import mongoose from "mongoose";

const { Schema, model } = mongoose;

const articleSchema = new Schema({
    Title: { type: String},
    Description: { type: String},
    image: { type: String},
   
}, 
{ timestamps: true });

export const Article = model('Article', articleSchema);