/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx}"];
export const mode = 'jit';
export const theme = {
  extend: {
  

    colors: {
      'dark-blue': '#2A2F4F',
      'dark-blue-2': '#917FB3',
      'dark-pink': '#E5BEEC',
      'lite-pink': '#FDE2F3'
    
    }
    ,clipPath: {
      polygon: 'polygon()',
    },
    
  },
};
export const plugins = [

];

