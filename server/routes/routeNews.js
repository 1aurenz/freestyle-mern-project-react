const express = require("express");
const FavoriteItem = require("../models/FavoriteItem");
const FavoritesComment = require('../models/FavoritesComment');


const router = express.Router();

// GET route to fetch all favorite items
router.get('/', async (req, res) => {
    try {
        // Fetch all favorite items from the database
        const favoriteItems = await FavoriteItem.find();

        // Return success response with fetched data
        res.status(200).json({
            message: "Favorite items fetched successfully",
            data: favoriteItems
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching favorite items" });
    }
});

// POST route to save a new favorite item
router.post('/', async (req, res) => {
    try {
        const newFavoriteItem = new FavoriteItem({
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            publishedAt: req.body.publishedAt
        });

        // Save the new favorite item to the database
        const savedFavoriteItem = await newFavoriteItem.save();

        // Return success response
        res.status(201).json({
            message: "Favorite item saved successfully",
            data: savedFavoriteItem
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving favorite item" });
    }
});

// DELETE route to remove a favorite item
router.delete('/:id', async (req, res) => {
    try {
        // Find and remove the favorite item from the database
        const deletedFavoriteItem = await FavoriteItem.findByIdAndRemove(req.params.id);
        if (!deletedFavoriteItem) {
            return res.status(404).json({ message: "Favorite item not found" });
        }

        // Return success response
        res.json({
            message: "Favorite item removed successfully",
            data: deletedFavoriteItem
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error removing favorite item" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Fetch all favorite items from the database
        const favoriteItems = await FavoriteItem.findById(req.params.id);

        // Return success response with fetched data
        res.status(200).json({
            message: "Favorite items fetched successfully",
            data: favoriteItems
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching favorite items" });
    }
});

// GET route to fetch comments for a favorite item
router.get('/comments/:favoriteItemId', async (req, res) => {
    console.log("getting favorites")
    try {
        // Fetch comments for a specific favorite item by its ID
        const comments = await FavoritesComment.find({ favoriteItemId: req.params.favoriteItemId });

        // Return success response with fetched data
        res.status(200).json({
            message: "Comments fetched successfully",
            data: comments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching comments" });
    }
});

// DELETE route to remove a comment
router.delete('/comments/:commentId', async (req, res) => {
    try {
        // Find the comment by its ID and remove it from the database
        const deletedComment = await FavoritesComment.findByIdAndDelete(req.params.commentId);

        // Check if the comment was found and deleted successfully
        if (deletedComment) {
            // Return success response
            res.status(200).json({
                message: "Comment deleted successfully",
                data: deletedComment
            });
        } else {
            // Return error response if comment not found
            res.status(404).json({ message: "Comment not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting comment" });
    }
});


// POST route to save a new favorite item
router.post('/comments', async (req, res, next) => {
    try {
        const newFavoritesComment = new FavoritesComment({
            favoriteItemId: req.body.favoriteItemId,
            comment: req.body.comment
        });

        // Save the new favorite item to the database
        const savedFavoritesComment = await newFavoritesComment.save();

        // Return success response
        res.status(201).json({
            message: "Comment item saved successfully",
            data: savedFavoritesComment
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving favorite item" });
    }
});

// PATCH route to update a favorite comment
router.patch('/comments/:id', async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const { comment } = req.body;

        // Find the favorite comment in the database
        const favoriteComment = await FavoritesComment.findById(commentId);

        if (!favoriteComment) {
            return res.status(404).json({ message: "Favorite comment not found" });
        }

        // Update the comment field
        favoriteComment.comment = comment;

        // Save the updated favorite comment to the database
        const updatedFavoriteComment = await favoriteComment.save();

        // Return success response
        res.status(200).json({
            message: "Comment item updated successfully",
            data: updatedFavoriteComment
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating favorite comment" });
    }
});


module.exports = router;
