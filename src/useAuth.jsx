import { create } from 'zustand';
import axios from 'axios';


const useAuth = create((set) => ({
    isLoggedIn: false,
    errorMessage: '',
    setErrorMessage: (errorMessage) => {
        set({ errorMessage: errorMessage })
    },
    login: async (email, password, navigate) => {


        try {
            const response = await axios.post(`/reg/login`, {
                email,
                password,
            });

            if (response.status === 200) {


             
                set({ isLoggedIn: true });

                navigate('/home', { replace: true });

            
            } else {
                useAuth.getState().setErrorMessage('Invalid credentials');
            }
        } catch (error) {
            console.error(error);
            useAuth.getState().setErrorMessage(error.response?.data?.errorMessage || 'An error occurred during login');
        }


    },
    logout: (navigate) => {
        removeCookie()
        set({ isLoggedIn: false });
        // navigate('/register', { replace: true });

    },
}));

export default useAuth;