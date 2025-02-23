import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import RemixRouter from 'vite-plugin-remix-router'
import path from 'path'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 8003,
  },
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    RemixRouter({
      // configuration options
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
