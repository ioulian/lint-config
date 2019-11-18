#!/usr/bin/env node

const destPath = process.env.INIT_CWD
const fs = require('fs')
const chalk = require('chalk')

const copyFile = (from, to, message, resolve, reject) => {
  fs.copyFile(require.resolve(from), `${destPath}${to}`, err => {
    if (err) {
      reject()
      throw err
    }

    console.log(message)
    resolve()
  })
}

const installFile = (from, to, message) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(`${destPath}${to}`)) {
      /* eslint-disable */
      const readline = require('readline')
      /* eslint-enable */
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      rl.question(
        `${chalk.bold(
          to
        )} file already exists, do you want to override it? ${chalk.yellow(
          '(yes/no)'
        )} `,
        answer => {
          rl.close()
          if (['y', 'yes'].includes(answer)) {
            copyFile(
              from,
              to,
              `${chalk.green('✓')} ${chalk.bold(to)} overridden.`,
              resolve,
              reject
            )
          } else {
            resolve()
          }
        }
      )
    } else {
      copyFile(from, to, message, resolve, reject)
    }
  })
}

const addScriptsToPackageJson = message => {
  fs.copyFile(
    `${destPath}/package.json`,
    `${destPath}/package.json.bak`,
    err => {
      if (err) {
        throw err
      }

      console.log(
        `${chalk.green('✓')} ${chalk.bold(
          'package.json'
        )} backed up to ${chalk.bold('package.json.bak')}.`
      )
    }
  )

  fs.readFile(`${destPath}/package.json`, 'utf8', (errRead, data) => {
    if (errRead) {
      throw errRead
    }

    const json = JSON.parse(data)

    if (typeof json.scripts === 'undefined') {
      json.scripts = {}
    }

    json.scripts['eslint:lint:js'] = "eslint 'src/js/**/*.js'"
    json.scripts['eslint:fix:js'] = "eslint --fix 'src/js/**/*.js'"
    json.scripts['eslint:lint:ts'] = "eslint 'src/ts/**/*.ts'"
    json.scripts['eslint:fix:ts'] = "eslint --fix 'src/ts/**/*.ts'"
    json.scripts['stylelint:lint:scss'] = "stylelint 'src/scss/**/*.scss'"
    json.scripts['stylelint:fix:scss'] = "stylelint --fix 'src/scss/**/*.scss'"
    json.scripts['prettier:lint'] = "prettier --check 'src/**/*.{js,scss,ts}'"
    json.scripts['prettier:fix'] = "prettier --write 'src/**/*.{js,scss,ts}'"

    fs.writeFile(
      `${destPath}/package.json`,
      JSON.stringify(json, null, 2),
      errWrite => {
        if (errWrite) {
          throw errWrite
        }
        console.log(message)
      }
    )
  })
}

const install = async () => {
  // Create needed folders
  fs.mkdirSync(`${destPath}/src/js`, {
    recursive: true,
  })
  fs.mkdirSync(`${destPath}/src/ts`, {
    recursive: true,
  })
  fs.mkdirSync(`${destPath}/src/scss`, {
    recursive: true,
  })

  // Copy all listing files
  await installFile(
    './../.editorconfig',
    '/.editorconfig',
    `${chalk.green('✓')} ${chalk.bold('.editorconfig')} file created.`
  )
  await installFile(
    './../.nvmrc',
    '/.nvmrc',
    `${chalk.green('✓')} ${chalk.bold('.nvmrc')} file created.`
  )
  await installFile(
    './../.prettierrc.json',
    '/.prettierrc.json',
    `${chalk.green('✓')} ${chalk.bold('.prettierrc.json')} file created.`
  )
  await installFile(
    './../scss/.stylelintrc.json',
    '/src/scss/.stylelintrc.json',
    `${chalk.green('✓')} ${chalk.bold('.stylelintrc.json')} file created.`
  )
  await installFile(
    './../js/.eslintrc.json',
    '/src/js/.eslintrc.json',
    `${chalk.green('✓')} ${chalk.bold('.eslintrc.json')} file created.`
  )
  await installFile(
    './../ts/.eslintrc.json',
    '/src/ts/.eslintrc.json',
    `${chalk.green('✓')} ${chalk.bold('.eslintrc.json')} file created.`
  )

  // Add linting scripts to original package.json
  addScriptsToPackageJson(
    `${chalk.green('✓')} ${chalk.bold(
      'package.json'
    )} updated with linting scripts.`
  )
}

if (process.argv.includes('install')) {
  install()
}
