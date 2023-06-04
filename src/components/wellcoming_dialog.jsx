import { useState, useEffect } from 'react';

function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem('hasSeenDialog');
    if (!hasSeenDialog) {
      setIsOpen(true);
      localStorage.setItem('hasSeenDialog', true);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 z-40 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-dark-blue">Welcome to the site!</h1>
          <button className="text-2xl text-gray-700 hover:text-gray-900" onClick={handleClose}>
            &times;
          </button>
        </div>
        <p className="text-gray-700">Note: This site is made as a practice project for gaining some experience in React and Vite Framework, and the data and images used on the site are static and not real. However, the code can be modified for handling real data.</p>

      </div>
    </div>
  );
}


export default WelcomeDialog;