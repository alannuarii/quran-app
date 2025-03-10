import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';

// Muat variabel lingkungan dari .env
dotenv.config();

export default defineConfig({
  plugins: [sveltekit()],

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
