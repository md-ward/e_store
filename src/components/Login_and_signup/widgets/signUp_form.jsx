import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { useState } from 'react';

const SignUpForm = ({ email, handleEmailChange, password, handlePasswordChange, TougglePassword, handleTougglePassword, handleSubmit }) => {
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className={`${window.innerWidth < 780 ? 'stagger' : ''}`}>
            <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2 ">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full px-4 py-2 rounded-lg text-black focus:border-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <span className="flex justify-between items-center">
                    <label htmlFor="password" className="block font-medium mb-2">Password</label>
                    <FontAwesomeIcon icon={TougglePassword ? faEye : faEyeSlash} className="text-white cursor-pointer" onClick={handleTougglePassword}></FontAwesomeIcon>
                </span>
                <input
                    type={TougglePassword ? 'text' : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full text-black px-4 py-2 rounded-lg focus:border-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full px-4 py-2 rounded-lg text-black focus:border-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-dark-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                Submit
            </button>
        </form>
    );
};



export default SignUpForm;
