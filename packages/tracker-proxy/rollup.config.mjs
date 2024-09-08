import typescriptPlugin from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const IS_DEV = process.env.IS_DEV === 'true';

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
    json(),
    ...(IS_DEV
      ? [
          serve({
            port: 2137,
            contentBase: 'dist',
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          }),
        ]
      : []),
  ],
};
