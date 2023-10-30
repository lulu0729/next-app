'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios';
import { validateForm } from './helper';
import xss from 'xss-filters';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const onLogin = (username: string, password: string) => {
        axios.post('/api/login', {
            username,
            password
        }).then((res) => {
            if (res.data.success) {
                toast.success('Login successful!');
            } else {
                toast.error('Login failed!');
            }
        }).catch((error) => {
            toast.error('Login failed!');
        });
    }
    const handleUsernameChange = (value: string) => {
        const sanitizedValue = xss.inHTMLData(value);
        setUsername(sanitizedValue);
    }
    const handlePasswordChange = (value: string) => {
        const sanitizedValue = xss.inHTMLData(value);
        setPassword(sanitizedValue);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors = validateForm({ username, password })
        setErrors(validationErrors);
        if(validationErrors.length === 0) {
          onLogin(username, password);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="flex items-center">
                    <label htmlFor="username">username</label>
                    <input
                        className="p-2 m-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        placeholder="username"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="password">password</label>
                    <input
                        className="p-2 m-4 border border-gray-400 gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        placeholder="password"
                    />
                </div>
                {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                ))}
                <button
                    type="submit"
                    className="p-2 m-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                >
                    login
                </button>
            </form>
            <Toaster />
        </div>
    )
}