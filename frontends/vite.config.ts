import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: '0.0.0.0',
      port: 5173
    },  
    define: {
      'process.env.BASE_URL': JSON.stringify(env.BASE_URL)
    },
    plugins: [react()],
  }
})