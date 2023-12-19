import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.confirm('Logged out successfully!');
        window.location.reload();
    };
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">AI News App</span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                        Home
                    </Link>
                    <Link to="/news" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                        News
                    </Link>
                    <Link
                        to="/favorites"
                        className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
                    >
                        Favorites
                    </Link>
                </div>
                <div>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-2"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

