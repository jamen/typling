# typling

> Create and verify types from command line

![Screenshot](docs/screenshot.png)

## Installation

```sh
$ npm install --global typling
```

## Usage

```sh
$ typling [--help, --entry, --modules] [...globs]
```

 - `--help`: Print usage and flag descriptions
 - `--entry`: The entry directory for your relative paths.  Defaults to cwd
 - `--modules`: Allows `node_modules` to be globbed.  Defaults to `false`

Examples:

```sh
$ typling
$ typling lib/**/*.js
$ typling --modules
$ typling --entry=./lib foo.js bar.js
$ typling --help
```

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/typling.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/typling.svg?style=flat-square)](https://travis-ci.org/jamen/typling) [![downloads](https://img.shields.io/npm/dt/typling.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/typling.svg?style=flat-square)][package] [![support me](https://img.shields.io/badge/support%20me-paypal-green.svg?style=flat-square)](https://paypal.me/jamenmarz/5usd) [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/typling
