import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data);
            // Check if user creation was successful
            if (response.ok) {
                const shouldRedirect = window.confirm('User created successfully! \nClick OK to go back to the Login page.');
                if (shouldRedirect) {
                    navigate('/Login');
                }
            } else {
                setErrorMessage(data.error);
            }
            // Do something with response data if needed
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again.'); // Display a generic error message
        }
    };

    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-3xl font-bold mb-4">Signup</h1>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded p-2 mb-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded p-2 mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
