import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import NewsPage from './components/NewsPage';
import FavoritesPage from './components/FavoritesPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

const UserContext = createContext(null);

function App() {
  const [myFavorites, setMyFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const addToFavorites = (favoriteItem) => {
    setMyFavorites([...myFavorites, favoriteItem]);
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ isLoggedIn }}>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/news"
            element={
              <UserContext.Provider value={{ isLoggedIn }}>
                <NewsPage addToFavorites={addToFavorites} />
              </UserContext.Provider>
            }
          />
          <Route
            path="/favorites"
            element={<FavoritesPage myFavorites={myFavorites} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
