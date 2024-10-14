import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    vue(),
    laravel({
      input: ['resources/js/app.js', 'resources/css/app.css'],
      refresh: true,
    }),
  ],
  server: {
    host: '0.0.0.0', // Listen on all IPs to ensure accessibility
    hmr: {
      host: '45.91.169.233', // Production IP address for HMR if needed
    },
  },
  build: {
    manifest: true, // Generate a manifest for production
    outDir: 'public/build', // Ensure output in the correct directory
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
});
