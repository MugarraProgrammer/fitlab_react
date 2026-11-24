import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Vite reenvía /api/... al backend Spring Boot (puerto 8081).
    // Ej: /api/productos -> http://localhost:8081/api/productos
    proxy: {
      '/api': 'http://localhost:8081',
    },
  },
})