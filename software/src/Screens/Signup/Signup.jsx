import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Config/Firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import './Signup.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError(''); 

        if (!firstName || !lastName || !email || !password) {
            setError('All fields are required.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                firstName,
                lastName,
                email,
            });

            console.log('User signed up and data stored:', user.uid);
            navigate('/');
        } catch (err) {
            console.error('Error during signup:', err);
            setError('Failed to sign up. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="left-side">
                <div className="logo">
                    <img src="https://learning-management-syst-6bfa4.web.app/static/media/jplogo.de47c5a316ceff8d5569.jpg" alt="Logo" />
                </div>
                <h1>Welcome to Learning <br /> Management System</h1>
                <img height={300} src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR67t2vqZmw9FLZX9zPm2wPg8j6fJpPjjNMRaMc7iBZW4QFXaG3" alt="Background" className="background-image" />
            </div>

            <div className="right-side">
                <h2>Signup</h2>
                <form>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-password"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>

                    
                    {error && <p className="error-message">{error}</p>}

                    <button
                        type="button"
                        onClick={handleSignup}
                        disabled={!firstName || !lastName || !email || !password}
                    >
                        Signup
                    </button>
                </form>
                <p>or</p>
                <p className="login-link" onClick={() => navigate('/login')}>Already have a profile?</p>
            </div>
        </div>
    );
};

export default Signup;
