import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/Utils';



function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = name === 'email' ? value.toLowerCase() : value;
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800">Signup</h1>
                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name..."
                            value={signupInfo.name}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            value={signupInfo.email}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            value={signupInfo.password}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    >
                        Signup
                    </button>
                </form>
                <div className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;
