import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ include: "**/*.jsx" })] ,
  optimizeDeps: {
    // Add heavy dependencies here (e.g., lodash, react-icons):
    include: ['react', 'react-dom', 'react-router-dom', 'react-icons'],
  },
})
