### Setup
* you should have `nodejs` installed.
* run `npm install` command to install the dependencies.
* run `npm start` command to start the project, it will open chrome browser automically.

### Required Knowledge
* based on pixi.js version 5.2.
* use `webpack` to debug the project at development phase, and combine, convert(to es5) and obfuscate `js` files at distribution phase.
* the code is written in es8 and use `babel` to convert `es6+` to `es5`.
* use `texturepacker` tool to create atlas.
* basic `css`and`html`knowledge, the `canvas` will auto fit the screen when viewport changed.

### File Structure
* `res`: `texturepacker` project and original font files etc.
* `src`:all game resource and source code.
* `dist`: distribute the final game project here.
* `webpack.common.js`: webpack common configuration file.
* `webpack.dev.js`: webpack configuration file for development.
* `webpack.prod.js`: webpack configuration file for produciton.
* `package.json`: `node` configuration file.

### Distribution
* run `npm run build`command to `release` the project, all the files will copy into `dist` directory, all `.js` files will combined、converted to `es5` and obfuscated, all png files will be optimized.
