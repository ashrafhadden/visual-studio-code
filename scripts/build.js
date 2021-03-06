'use strict'
console.time('⏰')
const path = require('path')
const fs = require('fs')
const loadThemes = require('./loadThemes')

const THEME_DIR = path.join(__dirname, '..', 'themes')
const THEME_YAML_FILE = path.join(__dirname, '..', 'src', 'dracula.yml')

function toJSON(theme) {
  return JSON.stringify(theme, null, 4)
}

async function build() {
  if (!(await fs.existsSync(THEME_DIR))) {
    await fs.mkdir(THEME_DIR, err => {if (err) throw err})
  }
  // create file if it doens't exist OR overwrite if it does
  fs.writeFileSync('colors-used-table.md', '')

  const extensionName = process.env.npm_package_name
  const { json, json_light, json_lightDarker, json_white, json_whiteDarker } = await loadThemes(THEME_YAML_FILE)
  const themePath = path.join(THEME_DIR, `${extensionName}.json`)
  const themePath_light = path.join(THEME_DIR, `${extensionName}-light.json`)
  const themePath_lightDarker = path.join(THEME_DIR, `${extensionName}-light-darker.json`)
  const themePath_white = path.join(THEME_DIR, `${extensionName}-white.json`)
  const themePath_whiteDarker = path.join(THEME_DIR, `${extensionName}-white-darker.json`)

  await Promise.all([
    // TODO move MDTable build logic in build.js
    fs.writeFileSync(themePath, toJSON(json)),
    fs.writeFileSync(themePath_light, toJSON(json_light)),
    fs.writeFileSync(themePath_lightDarker, toJSON(json_lightDarker)),
    fs.writeFileSync(themePath_white, toJSON(json_white)),
    fs.writeFileSync(themePath_whiteDarker, toJSON(json_whiteDarker)),
    // fs.writeFile(themePath, toJSON(json), err => {if (err) throw err}),
    // fs.writeFile(themePath_light, toJSON(json_light), err => {if (err) throw err}),
    // fs.writeFile(themePath_lightDarker, toJSON(json_lightDarker), err => {if (err) throw err}),
    // fs.writeFile(themePath_white, toJSON(json_white), err => {if (err) throw err}),
    // fs.writeFile(themePath_whiteDarker, toJSON(json_whiteDarker), err => {if (err) throw err}),
  ])
  console.timeEnd('⏰')
}

module.exports = {
  build,
}

build()
