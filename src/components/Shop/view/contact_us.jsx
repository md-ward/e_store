import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Snackbar from '../../Dashboard/widgets/snackBar';
import { useSnackbar } from '../../Dashboard/store/showSnackBar';
import axios from 'axios';
import Loader from '../../../loader';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const showSnackBar = useSnackbar(state => state.showSnackbar);
    const hideSnackBar = useSnackbar(state => state.hideSnackbar);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'message') {
            setMessage(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set isSubmitting to true to show the loader

        const contactUsData = {
            "user_name": name,
            "email": email,
            "message": message
        }

        try {
          let res=  await axios.post('http://localhost:3000/contactUs/new_message', contactUsData);
            showSnackBar('Email submitted successfully.');
            hideSnackBar(1500);
            setIsSubmitting(false); // Set isSubmitting to false to hide the loader
            setName('');
            setEmail('');
            setMessage('');
            
        } catch (error) {
            console.error(error);
            setIsSubmitting(false); // Set isSubmitting to false to hide the loader
            showSnackBar('Error submitting email. Please try again later.');
            hideSnackBar(1500);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200 opacity-90 ">
            <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md   shadow-dark-blue">
                <h1 className="text-4xl text-center font-bold mb-8 text-dark-blue">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-medium mb-2">Name<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="rounded-lg px-4 py-2 border border-gray-300"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium mb-2">Email<span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="rounded-lg px-4 py-2 border border-gray-300"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="message" className="font-medium mb-2">Message<span className="text-red-500">*</span></label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            className="rounded-lg px-4 py-2 border border-gray-300"
                            placeholder="Enter your message"
                            value={message}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <div className='flex justify-center'>
                        {isSubmitting && <Loader />} {/* Show the loader if isSubmitting is true */}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-dark-blue group text-white rounded-lg px-4 py-2 hover:bg-dark-blue hover:opacity-95 flex items-center justify-center"
                    >
                        <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span> {/* Change the button text to 'Submitting...' if isSubmitting is true */}
                        <FontAwesomeIcon icon={faPaperPlane} className="ml-2 jump-and-shake group-hover:animate-none max-sm:animate-none" />
                    </button>
                    <Snackbar key={'contact'}></Snackbar>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;