import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

export default [
  {
    input: 'src/index.tsx',
    plugins: [
      typescript(),
    ],
    output: {
      file: pkg.module,
      format: 'es',
    },
    external: ['react'],
  },
  {
    input: 'src/index.tsx',
    plugins: [
      typescript(),
    ],
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    external: ['react'],
  },
  {
    // 生成 .d.ts 类型声明文件
    input: './src/index.tsx',
    output: {
      file: pkg.types,
      format: 'es',
    },
    plugins: [dts()],
  },
];
