import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UnofficialWaniKani', // Global variable name for UMD build
      fileName: (format) => `unofficial-wanikani.${format === 'es' ? 'js' : 'umd.cjs'}`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['cross-fetch'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'cross-fetch': 'crossFetch',
        },
      },
    },
    sourcemap: true, // Optional: include source maps
  },
  plugins: [
    dts({
        // Specify the entry point for declaration file generation
        entryRoot: resolve(__dirname, 'src'),
        // Specify the output directory for declaration files
        outDir: resolve(__dirname, 'dist'),
        // Specify the tsconfig file to use
        tsconfigPath: resolve(__dirname, 'tsconfig.json'),
        // Insert types entry point for types field in package.json
        insertTypesEntry: true,
    })
  ],
});
