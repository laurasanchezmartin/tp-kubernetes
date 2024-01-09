import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const service = process.env.NODE_SERVICE ;
const port = process.env.NODE_PORT ;
const nodeURL = `http://${service}:${port}`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: nodeURL,
        changeOrigin: true
      },
    }
  }
})
