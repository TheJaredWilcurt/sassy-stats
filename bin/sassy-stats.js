#!/usr/bin/env node

var dirExists = require('../libs/directories').dirExists;
var walk = require('../libs/directories').walk;
var lib = require('../libs');
var P = require('./print_utils');
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var pkg = require('../package');
var util = require('util');
var commander = require('commander');
require('colors');

commander
  .version(pkg.version)
  .usage('[options] <directory>')
  .option('-j, --json', 'output as json')
  .option('-t, --text', 'output as html')
  .parse(process.argv);

if (dirExists(commander.args[0])) {
  var files = walk(commander.args[0]);
  var data = lib(files.data);

  if (commander.json) {
    data.files = files.count;
    console.log(util.inspect(data, false, Infinity));
  
  } else if(commander.text) {
    var templateStr = fs.readFileSync(path.join(__dirname, '..', 'template.ejs'), 'utf8');
    console.log(ejs.render(templateStr, {categories: getCategories(data), files: files}));

  } else {
    print(data);
  }
} else {
  console.log(commander.args[0] + ' is not a valid directory!');
}

function getCategories(data) {
  return Object.keys(data)
    .map(function(key) {
      return {
        category: key.toUpperCase(), 
        rows: getRows(data[key]), 
        total: getTotal(data[key])
      };
    });
}

function getTotal(stats) {
  return Object.keys(stats)
    .reduce(function(acc, key) {
      return acc+= stats[key];
    }, 0);
}

function getRows(stats) {
  return Object.keys(stats)
    .map(function(key) {
      return {key: key, val: stats[key]};
    })
    .sort(function(a, b) {
      return b.val - a.val;
    });
}

function print() {
  P.printName();
  console.log('');

  var modules = Object.keys(data);

  modules.forEach(P.makePrintList(data));

  P.printFiles(files);
}