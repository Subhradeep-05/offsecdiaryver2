import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      "/api/forms": {
        target: "https://script.google.com/macros/s/AKfycbwDQn4p9sPVV5Bu560NK3ugErfknvvRg0tEamhjzu8ixuZFr5vGbR2SYsI7H9cT968/exec",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/forms/, ""),
      },
    },
  },
})
