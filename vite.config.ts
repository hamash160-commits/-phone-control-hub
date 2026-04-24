import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env.CLAUDE_API_KEY': JSON.stringify(process.env.VITE_CLAUDE_KEY || ''),
  }
});
