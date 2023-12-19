import React, { useState } from 'react';

const NewsItem = ({ title, description, url, publishedAt, onFavoriteClick }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    // saving favorite into the Favorites database
    const handleFavoriteClick = async (e) => {
        e.preventDefault();
        console.log("favorited");


        try {
            const response = await fetch('http://localhost:3001/api/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, url, publishedAt }),
            });
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error(error);
        }

        setIsFavorited(!isFavorited);
        onFavoriteClick({ title, description, url, publishedAt });
    };

    return (
        <div className="p-4 border border-gray-300 shadow rounded-md">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-500 text-sm">{description}</p>
            <a href={url} className="text-blue-600 text-sm">{url}</a>
            <p className="text-gray-500 text-sm">{publishedAt}</p>
            {isFavorited ? (
                <h4 className="text-green-500 font-bold mt-2">
                    Favorited
                </h4>
            ) : (
                <button onClick={handleFavoriteClick} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-2">
                    Favorite
                </button>
            )}
        </div>
    );
};

export default NewsItem;
