import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // for the server to listen on all network interfaces
  /*
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173, // Optional: specify the port
  },
  */
})
