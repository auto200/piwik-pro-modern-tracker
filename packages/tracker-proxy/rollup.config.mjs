import typescriptPlugin from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
    },
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    typescriptPlugin(),
    serve({
      port: 2137,
      contentBase: 'dist',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
};
