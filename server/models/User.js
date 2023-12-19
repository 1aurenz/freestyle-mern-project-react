const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FavoriteItem'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FavoritesComment'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;