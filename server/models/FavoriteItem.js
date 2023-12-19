const mongoose = require('mongoose');

const favoriteItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        required: true
    }
});

const FavoriteItem = mongoose.model('FavoriteItem', favoriteItemSchema);

module.exports = FavoriteItem;