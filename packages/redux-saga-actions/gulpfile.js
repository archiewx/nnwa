const gulp = require('gulp');
const rollup = require('rollup');
const pluginTS = require('rollup-plugin-typescript2');
const pluginResolve = require('@rollup/plugin-node-resolve').default;
const path = require('path');
const fse = require('fs-extra');

gulp.task('build', async () => {
  const outPath = path.resolve(__dirname, 'es');
  fse.removeSync(outPath);
  const bundle = await rollup.rollup({
    input: 'lib/index.ts',
    plugins: [
      pluginResolve({ moduleDirectories: ['node_modules'] }),
      pluginTS(),
    ],
    external: (id) => /(^redux)|(^redux-saga)/.test(id),
  });
  return await bundle.write({
    file: 'es/index.js',
    format: 'es',
    name: 'library',
    sourcemap: true,
  });
});
