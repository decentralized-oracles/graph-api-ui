import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';

// https://vitejs.dev/config/
/*export default defineConfig({
  plugins: [react()],
});*/

export default defineConfig(() => ({
  root: '.',
  build: {
    emptyOutDir: true,
    outDir: '../dist/graph-api'
  },
  base: '/graph-api',
  resolve: {
    alias: {
      buffer: 'buffer/',
    },
  },
  plugins: [react()],
  esbuild: {
    //loader: "jsx",
    //include: /src\/.*\.jsx?$/,
    loader: "tsx",
    include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
}));
