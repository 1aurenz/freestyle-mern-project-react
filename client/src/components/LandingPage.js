import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-8">Welcome to our AI News App</h1>
            <p className="text-xl text-gray-700 mb-12">Explore the latest AI news from around the world.</p>
            <Link
                to="/news"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                View News
            </Link>
        </div>
    );
}

export default LandingPage;
