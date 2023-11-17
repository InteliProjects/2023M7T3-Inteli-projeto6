import { defineConfig} from 'vite'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from "rollup-plugin-polyfill-node";

import dotenv from 'dotenv'

dotenv.config() // load env vars from .env

export default defineConfig({
  // Other rules...
  resolve: {
    alias: {
      util: "util/",
    }
  },
  optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
              NodeGlobalsPolyfillPlugin({
                buffer: true,
                process: true,
              }),
            ],
        }
    },
    build: {
      rollupOptions: {
        // Enable rollup polyfills plugin
        // used during production bundling
        plugins: [nodePolyfills()],
      },
  },
});