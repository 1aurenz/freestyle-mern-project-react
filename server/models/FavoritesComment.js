const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    favoriteItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FavoriteItem', // Reference to the FavoriteItem model
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export Comment model
module.exports = mongoose.model('FavoritesComment', commentSchema);