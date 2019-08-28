import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { terser } from "rollup-plugin-terser";

const extensions = ['.js', '.ts'];

const configFn = (inputFile, outputFile) => {
  return {
    plugins: [
      resolve({ extensions }),
      json({
        preferConst: true,
        compact: true,
        namedExports: true
      }),
      commonjs(),
      babel({ extensions, include: ['src/**/*'] }),
      terser({}),
    ],

    input: inputFile,
    output: {
      file: outputFile,
      format: 'cjs',
    }
  };
}



export default [
  configFn('./src/*.ts', './dist/authorizer.js'),
]