// NewsPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsItem from './NewsItem';

function NewsPage(props) {
    const [newsData, setNewsData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1))); // State for currently selected date
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const year = selectedDate.getFullYear(); // Get year from selected date
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Get month from selected date and pad with zero if needed
                const day = String(selectedDate.getDate()).padStart(2, '0'); // Get day from selected date and pad with zero if needed

                const newsDate = `${year}-${month}-${day}`; // Format selected date as yyyy-mm-dd

                const response = await fetch(`https://newsapi.org/v2/everything?q=AI&from=${newsDate}&sortBy=popularity&apiKey=c9409b0cfce241e2b7b740fb0b9150bd`);
                const data = await response.json();
                console.log(data);
                setNewsData(data.articles.slice(0, 10));
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [selectedDate]); // Trigger useEffect whenever selectedDate changes

    useEffect(() => {
        const fetchFavorites = async () => {
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

        fetchFavorites();
    }, []);

    const handleFavoriteClick = async (favoriteItem) => {
        const isAlreadyFavorited = favorites.some((item) => item.title === favoriteItem.title);
        if (!isAlreadyFavorited) {
            setFavorites((prevFavorites) => [...prevFavorites, favoriteItem]);
            props.addToFavorites(favoriteItem);
        }
    };

    const handleUnfavoriteClick = (favoriteItem) => {
        console.log(favoriteItem);
        setFavorites((prevFavorites) => prevFavorites.filter((item) => item.title !== favoriteItem.title));
    };


    const handleFavoritesButtonClick = () => {
        navigate('/favorites');
    };

    const handleDateChange = (event) => {
        setSelectedDate(new Date(event.target.value)); // Update selected date in state
    };

    return (
        <div className="bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-4">Top AI News For Every Day</h1>
            <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="date" className="text-lg font-medium">Select date:</label>
                <input type="date" id="date" value={selectedDate.toISOString().slice(0, 10)} onChange={handleDateChange} className="border border-gray-400 p-2 rounded" />
                <button onClick={handleFavoritesButtonClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">My favorites</button>
            </div>
            {newsData.length === 0 ? (
                <p className="text-xl">News not yet available</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsData.map((item, index) => {
                        const isAlreadyFavorited = favorites.some((favorite) => favorite.title === item.title);
                        return (
                            <NewsItem
                                key={index}
                                title={item.title}
                                description={item.description}
                                url={item.url}
                                publishedAt={item.publishedAt}
                                onFavoriteClick={() => handleFavoriteClick(item)}
                                onUnfavoriteClick={() => handleUnfavoriteClick(item)}
                                isFavorited={isAlreadyFavorited}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default NewsPage;
