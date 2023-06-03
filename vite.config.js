import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/e_store/",
  plugins: [react()],
  // build: {
  //   sourcemap: false,
  //   rollupOptions: {
  //     external: ['@fortawesome/react-fontawesome','@fortawesome/free-solid-svg-icons','zustand','@fortawesome/free-regular-svg-icons'],
  //   },
  // },
})