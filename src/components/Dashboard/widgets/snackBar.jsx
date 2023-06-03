import { Transition } from "@headlessui/react";

import {useSnackbar} from '../store/showSnackBar'
function Snackbar() {
  const isOpen = useSnackbar(state => state.isOpen);
  const message = useSnackbar(state => state.message);
  const hideSnackbar = useSnackbar(state => state.hideSnackbar);

  return (
    <Transition
      show={isOpen}
      enter="transform transition duration-300 ease-out"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transform transition duration-300 ease-out"
      leaveFrom="translate-y-0 opacity-100 sm:translate-x-0"
      leaveTo="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    >
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md">
          {message}
          <button
            className="float-right text-gray-400 hover:text-white focus:outline-none"
            onClick={hideSnackbar}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  );
}

export default Snackbar; 