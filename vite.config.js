import eslintPlugin from '@rollup/plugin-eslint';

export default {
  plugins: [
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.js'],
    }),
  ],
  css: {
    preprocessorOptions: {
      sass: {},
    },
  },
};
