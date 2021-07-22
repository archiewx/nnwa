import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'components/index.ts'),
      name: 'CodeMirror',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react'],
    },
  },
});
