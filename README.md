# lint-config

## Introduction

This repository contains sample linting configs for .scss, .js and .ts files. Currently they are all based on recommended configs.

## How to use

### Installing (automatic)

To install this repo, run:

```bash
yarn add https://github.com/ioulian/lint-config
```

When the dependency has been installed, run:

```bash
yarn lint-config install
```

This will install all linting configs for you and update `package.json` with scripts. You can lint and fix your code with them.

#### Commit hooks

The `install` command also adds husky config into your `package.json` file. If you want to use pre-commit hooks, you can install husky for that.

```bash
yarn add husky
```

Using the config from `package.json` it will lint the code before the commit (blocking the commit if the code is not properly linted).
If you want to remove the commit hooks, just run this

```bash
yarn remove husky
```

### Installing (Manual)

Copy all dev dependencies from `package.json` and copy to your own `package.json`. Don't forget to run `yarn install`.

#### Base

Copy `.editorconfig`, `.nvmrc` and `.prettierrc.json` to your project root. Copy also all the needed scripts from `package.json` to run the linting and autofixing the problems. Do not forget to change the paths.

#### SCSS

Copy the file `./scss/.stylelintrc.json` to your project root.

#### JS

Copy the file `./js/.eslintrc.json` to your project root if you are using Javascript in your project.

#### TS

Copy the file `./ts/.eslintrc.json` to your project root if you are using TypeScript in your project.

#### Mixed TS and JS codebases

If you use JS and TS in a single codebase, you can copy the `.eslintrc.json` to correct directory.
For example, copy `./ts/.eslintrc.json` in your `./src/ts/` folder and `./js/.eslintrc.json` into `./src/js/`.

## VSCode extensions

You can install VSCode extensions for Prittier, Stylelint and ESLint. Make sure you change the config for "format on save" to true: `"editor.formatOnSave": true`. This will automatically format your code when you save.

## TODO

- The extends and parsers need to be in the package.json of the project
- Check how to make unified `.eslintrc.json` for JS and TS codebases
- Check what rules we need to update
- Update `.editorconfig` for `.php` files and more
- Add precommit hooks to fix/lint files.
- publish to npm
- give ownership to Intracto
