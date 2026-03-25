import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      historyApiFallback: true,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      // Optimisations de build
      target: 'es2020',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Séparer Three.js dans son propre chunk (~300KB)
            'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
            // Séparer Framer Motion (~65KB)
            'framer': ['framer-motion'],
            // Séparer React core
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
      chunkSizeWarningLimit: 500,
      // Inliner les assets < 4KB en base64
      assetsInlineLimit: 4096,
    },
  };
});
