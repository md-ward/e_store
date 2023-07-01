import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateBack, faBatteryEmpty, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Slide } from 'react-awesome-reveal';

const ViewContactusMessages = ({setChangePage}) => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:3000/contactUs/get')
            .then((response) => setMessages(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleDeleteMessage = () => {
        axios
            .delete('http://localhost:3000/contactUs/delete', {
                data: {
                    messageId: selectedMessage._id
                }
            })
            .then(() => {
                setMessages((prevState) =>
                    prevState.filter((message) => message._id !== selectedMessage._id)
                );
                setShowDeleteModal(false);
            })
            .catch((error) => console.error(error));
    };

    const handleCancelDelete = () => {
        setSelectedMessage(null);
        setShowDeleteModal(false);
    };

    const handleShowDeleteModal = (message) => {
        setSelectedMessage(message);
        setShowDeleteModal(true);
    };

    return (
        <div className="p-6 w-full h-full overflow-y-auto">
            <Slide>
                <span className='flex  items-center justify-between '>
                    <h1 className="text-3xl font-bold mb-4 text-dark-blue" >Contact Us Messages</h1>

                    <FontAwesomeIcon icon={faArrowLeft}
                       onClick={() => setChangePage(false)}
                        className='bg-dark-blue  text-2xl text-white hover:ring-1 ring-offset-2 ring-slate-900 rounded-full p-2 cursor-pointer hover:bg-indigo-900 transition-all duration-300 ease-in-out' />
                </span>
                <ul>
                    {

                        messages.length == 0 ? <span className='flex justify-center items-center h-96  w-full uppercase gap-4 '>
                            <h1>No messages so far</h1>

                            <FontAwesomeIcon icon={faWarning} className='text-6xl text-dark-blue animate-bounce' />

                        </span> :

                            messages.map((message) => (
                                <li key={message.id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col gap-4 justify-start">
                                    <p className="text-lg font-medium">{message.user_name}</p>
                                    <p className="text-gray-600">{message.email}</p>
                                    <p className="text-gray-800 mt-2">Message: {message.message}</p>
                                    <p>Message date: {message.created_at}</p>
                                    <span className='w-full  flex justify-end'>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2  "
                                            onClick={() => handleShowDeleteModal(message)}
                                        >
                                            Remove message
                                        </button>
                                    </span>
                                </li>
                            ))}
                </ul>
          
            </Slide>

            {showDeleteModal && (
                    <DeleteMessageModal
                        message={selectedMessage}
                        onCancel={handleCancelDelete}
                        onDelete={handleDeleteMessage}
                    />
                )}
        </div>

    );
};

export default ViewContactusMessages;








const DeleteMessageModal = ({ message, onCancel, onDelete }) => {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <div
                    className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <svg
                                className="h-6 w-6 text-red-600"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <h3
                                className="text-lg leading-6 font-medium text-gray-900"
                                id="modal-headline"
                            >
                                Remove message
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm leading-5 text-gray-500">
                                    Are you sure you want to remove this message?
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                        <span className="flex w-full rounded-md shadow-sm">
                            <button
                                type="button"
                                className="inline-flex justify-center w-1/2 rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center w-1/2 rounded-md border border-red-500 px-4 py-2 bg-red-500 text-base leading-6 font-medium text-white hover:bg-red-600 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                onClick={onDelete}
                            >
                                Delete
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


