import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../../loader";


const LogInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [togglePassword, setTogglePassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTogglePassword = () => {
        setTogglePassword(!togglePassword)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3000/register/login', {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                sessionStorage.setItem('personal_info', [email, response.data.fname + ' ' + response.data.lname]);

                navigate('/')
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
            // display error message to user
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`${window.innerWidth < 780 ? 'stagger' : ''}`}>
            <h2 className="text-2xl font-medium mb-6">Log In</h2>

            <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full px-4 py-2 rounded-lg text-black border-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <span className="flex justify-between items-center">
                    <label htmlFor="password" className="block font-medium mb-2">Password</label>
                    <FontAwesomeIcon icon={togglePassword ? faEye : faEyeSlash} className="text-white cursor-pointer" onClick={handleTogglePassword} ></FontAwesomeIcon>
                </span>
                <input
                    type={togglePassword ? 'text' : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full text-black px-4 py-2 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* conditional rendering of loader */}
            {submitting && (
                <div className="h-full w-full flex justify-center">
                    <Loader />
                </div>
            )}

          { !submitting&&  <button
                type="submit"
                className="w-full bg-dark-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                Log In
            </button>}
        </form>
    );
};


export default LogInForm;