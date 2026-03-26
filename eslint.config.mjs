import nextConfig from 'eslint-config-next';
import nextTypescript from 'eslint-config-next/typescript';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextConfig,
  ...nextTypescript,
];

export default eslintConfig;
