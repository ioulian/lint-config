const destPath = process.env.INIT_CWD
const fs = require('fs')
const chalk = require('chalk')

const installFile = (from, to, message) => {
  fs.copyFile(require.resolve(from), `${destPath}${to}`, err => {
    if (err) {
      throw err
    }

    console.log(message)
  })
}

const addScriptsToPackageJson = message => {
  fs.readFile(`${destPath}/package.json`, (err, data) => {
    const json = JSON.parse(data)

    json.scripts['eslint:lint:js'] = "eslint '**/*.js' --config ./js/index.js"
    json.scripts['eslint:fix:js'] =
      "eslint --fix '**/*.js' --config ./js/index.js"
    json.scripts['eslint:lint:ts'] = "eslint '**/*.ts' --config ./ts/index.js"
    json.scripts['eslint:fix:ts'] =
      "eslint --fix '**/*.ts' --config ./ts/index.js"
    json.scripts['stylelint:lint'] = "stylelint '**/*.scss'"
    json.scripts['stylelint:fix'] = "stylelint --fix '**/*.scss'"
    json.scripts['prettier:lint'] = "prettier --check '**/*.{js,scss,ts}'"
    json.scripts['prettier:fix'] = "prettier --write '**/*.{js,scss,ts}'"

    fs.writeFile(`${destPath}/package.json`, JSON.stringify(data), () => {
      console.log(message)
    })
  })
}

if (process.argv.includes('install')) {
  installFile(
    './../.editorconfig',
    '/.editorconfig',
    `${chalk.green('✓')} ${chalk.bold('.editorconfig')} file created.`
  )
  installFile(
    './../.nvmrc',
    '/.nvmrc',
    `${chalk.green('✓')} ${chalk.bold('.nvmrc')} file created.`
  )
  // generate config json file from js
  installFile(
    './../scss/.stylelintrc.json',
    '/src/scss/.stylelintrc.json',
    `${chalk.green('✓')} ${chalk.bold('.stylelintrc.json')} file created.`
  )
  // generate config json file from js
  installFile(
    './../js/.eslintrc.json',
    '/src/js/.eslintrc.json',
    `${chalk.green('✓')} ${chalk.bold('.eslintrc.json')} file created.`
  )
  // generate config json file from js
  installFile(
    './../ts/.eslintrc.json',
    '/src/ts/.eslintrc.json',
    `${chalk.green('✓')} ${chalk.bold('.eslintrc.json')} file created.`
  )

  addScriptsToPackageJson(
    `${chalk.green('✓')} ${chalk.bold(
      'package.json'
    )} updated with linting scripts.`
  )
}
