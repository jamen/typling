#!/usr/bin/env node

var esprima = require('esprima')
var noShebang = require('strip-shebang')
var typling = require('typling-core')
var modules = require('estree-modules')
var minimist = require('minimist')
var globby = require('globby')
var chalk = require('chalk')
var each = require('each-async')
var path = require('path')
var fs = require('fs')

var cli = minimist(process.argv.slice(2), {
  boolean: ['modules'],
  default: {
    entry: process.cwd(),
    modules: false
  }
})

if (cli.help) {
  console.log([
    '$ typling [--modules, --entry, --help] [...globs]', '',
    '  --help: Print usage and flag descriptions',
    '  --entry: The entry directory for your relative paths. Defaults to cwd',
    '  --modules: Allows `node_modules` to be globbed.  Defaults to `false`'
  ].join('\n'))
  process.exit(0)
}

var inputs = cli._.length ? cli._ : ['**/*.js']
var cache = {}

// Handle modules explicitly
inputs.push(cli.modules ? 'node_modules/**/*.js' : '!node_modules/**/*.js')

globby(inputs, {cwd: cli.entry}).then(function (files) {
  each(files, function (file, i, done) {
    file = path.resolve(file)
    var last = i === files.length
    fileReport(file, function (reports) {
      // console.log(reports)
      if (reports.length) {
        console.log(file)
        for (var i = 0, max = reports.length; i < max; i++) {
          var report = reports[i]
          var name = report.name
          var pos = '(' + report.line + ':' + report.column + ')'
          switch (name) {
            case 'TypeInvalid':
            case 'DefinitionMissing':
            case 'Error':
              { name = chalk.red(name); break }
            case 'TypeMissing':
              { name = chalk.yellow(name); break }
          }
          console.log('  ', name, pos, report.message)
        }
      }
      done()
    })
  }, console.error)
}, console.error)

function fileReport (mod, done) {
  mod = path.resolve(mod)
  if (cache[mod]) return done(cache[mod].report)
  fs.readFile(mod, function (err, data) {
    if (err) console.error(chalk.red('Error: Could not open file ' + mod))
    var source = noShebang(data.toString())
    var node = esprima.parse(source, {
      sourceType: 'module', attachComment: true, loc: true, tolerant: true })
    // TODO: load module typlings
    var context = cache[mod] = typling.check(node)
    if (node.errors) context.report = node.errors.map(toReport).concat(context.report)
    done(context.report)
  })
}

function toReport (error) {
  error.line = error.lineNumber
  error.column = error.columnNumber
  return error
}
