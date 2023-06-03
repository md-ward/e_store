import { create } from 'zustand';

export const useSnackbar = create((set) => ({
  isOpen: false,
  message: '',
  showSnackbar: (message) => set({ isOpen: true, message }),
  hideSnackbar: (timeout) => setTimeout(() => {
    set({ isOpen: false, message: '' })
  }, timeout)
}));

