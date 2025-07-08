import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Optimize build for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    // Enable compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimize for production
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Enable compression for dev server
  server: {
    compress: true,
    host: true
  },
  // Base URL for deployment
  base: './',
  // Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
  }
});