
import express from 'express';

import {createUser} from '../controller/userController.js';
import {login} from '../controller/userController.js';
import {verifyEmail} from '../controller/userController.js';
import {getUser} from '../controller/userController.js';
import {logout} from '../controller/userController.js';
import { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } from '../controller/articleController.js';

const router = express.Router();


router.post('/login', login)

router.post('/register', createUser)

router.post('/verifyEmail', verifyEmail)

router.get("/user", getUser)

router.post("/logout", logout)

router.post('/articles', createArticle); 
router.get('/articles', getArticles); 
router.get('/articles/:id', getArticleById); 
router.put('/articles/:id', updateArticle); 
router.delete('/articles/:id', deleteArticle);
export default router;