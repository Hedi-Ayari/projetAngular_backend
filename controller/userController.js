import { User } from '../models/user.js';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const createUser = async (request, response) => {
    //console.log(request.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const user = new User({
        email: request.body.email,
        password: hashedPassword,
        name: request.body.name,
        address: request.body.address,
        state: "Non valid",
    });

    const userEmail = await User.findOne({ email: request.body.email });
    console.log(userEmail);
    if (userEmail) {
        return response.status(404).send('Email already exists');
    }

    try {
        //* AWAIT = wait for the function to finish executing
        //insert
        const resultat = await user.save();

        const { password, ...data } = await resultat.toJSON();
        response.status(201).send(data);
    } catch (error) {
        console.log(error);
        response.status(500).json({ "Message": " Internal Server Error." });
    }
}

export const login = async (request, response) => {

    const user = await User.findOne({ email: request.body.email });

    if (!user) {
        return response.status(404).send('User not found');
    }

    if (!await bcrypt.compare(request.body.password, user.password)) {
        return response.status(400).send('Invalid Password');
    }

    const token = jwt.sign({ _id: user._id }, "secret");
    response.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1 day
    })

    response.send({
        message: "Logged in successfully."
    });
}

export const getUser = async (request, response) => {
    try {
        const cookie = request.cookies["jwt"];

        const claims = jwt.verify(cookie, "secret");

        if (!claims) {
            return response.status(401).send('unauthenticated');
        }

        const user = await User.findOne({ _id: claims._id });

        const { password, ...data } = await user.toJSON();

        response.send(data);
    } catch (error) {
        return response.status(401).send('unauthenticated');
    }
}

export const logout = (request, response) => {
    response.cookie('jwt', '', { maxAge: -1 });

    response.send({
        message: "Logged out successfully."
    });
}


export const verifyEmail = async (request, response) => {
    const { email } = request.body;
    try {
        const resultat = await User.findOne({ email });
        console.log(resultat);
        if (resultat) {
            response.json({ resultat, "Message": email + " does exist." }).status(409);
        } else {
            response.json({ "Message": email + " doesn't exist." }).status(200);
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ "Message": " Internal Server Error." });
    }
}