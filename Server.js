import express from 'express';
import mongoose from 'mongoose';
import router from './routes/app.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};

app.use(express.json());
app.use((request, response, next) => {
    console.log(request.path);
    next();
});

app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/route", router);

mongoose.connect("mongodb+srv://shampo:1Vzhy95PsrCD2rNr@cluster0.hbkxlkm.mongodb.net/?retryWrites=true&w=majority",  {useNewUrlParser: true, useUnifiedTopology: true} )
.then(() => {
    console.log('Connected to database: ' + process.env.DBNAME);
    app.listen(4000, () => {
        console.log(`Server is running on port ${4000}`);
    });
})
.catch((err) => {
    console.log(err);
});
