//Import mongoose library
import mongoose from "mongoose";

//Destructing Schema and model from mongoose
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, minlength: 10},
    password: { type: String, required: true, minlength: 8},
    name: { type: String, required: false, minlength: 5},
    address: { type: String, required: false, minlength: 8},
    state: { type: String},
}, 
{ timestamps: true });

export const User = model('User', userSchema);