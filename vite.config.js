import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['@radix-ui/react-tooltip']
  },
  build: {
    commonjsOptions: {
      include: [/@radix-ui\/react-tooltip/, /node_modules/]
    }
  },
  base: process.env.VITE_BASE_PATH || "/Farm_and_MarketPlace_MS",
})
