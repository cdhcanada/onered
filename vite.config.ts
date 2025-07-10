import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: [],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          utils: ['src/hooks/useGoogleSheets']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096
  },
  server: {
    host: true,
    hmr: {
      overlay: false
    }
  },
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
  },
  esbuild: {
    target: 'es2015',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
});