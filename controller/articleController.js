import { Article } from '../models/article.js'; // Adjust the import path based on your project structure

export const createArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating article' });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error getting articles' });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Error getting article' });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Error updating article' });
  }
};

export const deleteArticle = async (req, res) => {
    console.log(req.params.id);
  try {
    const deletedArticle = await Article.findOneAndDelete({ _id: req.params.id });
    if (!deletedArticle) {
        console.log("aaaaaaaa");
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting article' });
  }
};
