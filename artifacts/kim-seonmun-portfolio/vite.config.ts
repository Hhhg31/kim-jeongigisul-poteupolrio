import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const artifactRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(artifactRoot, "../..");

export default defineConfig({
  root: projectRoot,
  base: './',
  build: {
    outDir: path.resolve(artifactRoot, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port: Number(process.env.PORT || 5000),
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    port: Number(process.env.PORT || 5000),
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
