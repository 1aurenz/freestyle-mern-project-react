import React, { useEffect, useState } from 'react';
import Comment from './FavoritesComment';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/favorites', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                setFavorites(data.data); // Update state with response data
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleRemoveFavorite = async (id) => {
        try {
            // Send DELETE request to remove favorite item from the server
            await fetch(`http://localhost:3001/api/favorites/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            // Update favorites state by filtering out the removed item
            setFavorites(favorites.filter(favorite => favorite._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Favorites</h1>
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map((favorite, index) => (
                        <li key={index} className="bg-white p-5 rounded-lg shadow-md mb-5">
                            <h1 className="text-lg font-bold text-xl mb-3">{favorite.title}</h1>
                            <h2 className="text-lg text-xl mb-3">{favorite.url}</h2>
                            <Comment favoriteItemId={favorite._id} />
                            <button
                                className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-5"
                                onClick={() => handleRemoveFavorite(favorite._id)}
                            >
                                Remove Favorite
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-lg">No favorites added</p>
            )}
        </div>
    );
};

export default FavoritesPage;

