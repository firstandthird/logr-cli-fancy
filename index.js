'use strict';
//const textTable = require('text-table');
const repeating = require('repeating');
const stringWidth = require('string-width');
const fmtObj = require('fmt-obj');
const chalk = require('chalk');

exports.defaults = {
  color: true,
  separator: '  ::  ',
  appColumnWidth: 15,
  tagColor: 'dim',
  tagColors: {
    error: 'red',
    warning: 'yellow',
    success: 'green'
  },
  appColors: {}
};
const availableColors = [
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'red'
];
let lastColorIndex = 0;

exports.log = function(options, tags, message) {
  //first tag is considered the app
  let app = tags.shift() || '';
  const appWidth = stringWidth(app);

  if (typeof message === 'object') {
    const formatter = {
      property: chalk.bold,
      punctuation: chalk.cyan,
      literal: chalk.blue,
      number: chalk.yellow,
      string: chalk.green
    };
    message = fmtObj(message, Infinity, formatter, options.appColumnWidth + 5);
  }

  if (options.color) {
    if (!options.appColors[app]) {
      options.appColors[app] = availableColors[lastColorIndex];
      lastColorIndex++;
      if (lastColorIndex > availableColors.length - 1) {
        lastColorIndex = 0;
      }
    }
    app = chalk[options.appColors[app]](app);
    tags.forEach((tag, i) => {
      const color = options.tagColors[tag] ? chalk[options.tagColors[tag]] : chalk[options.tagColor];
      tags[i] = color(tag);
    });
    options.separator = chalk.gray(options.separator);
  }
  let tagString = '';
  if (tags.length !== 0) {
    tagString = ` ${chalk.gray('[')}${tags.join(',')}${chalk.gray(']')}`;
  }
  const tagsWidth = stringWidth(tagString);
  let appIndent = options.appColumnWidth - appWidth - tagsWidth;
  if (appIndent < 0) {
    appIndent = 0;
  }

  const msg = `${repeating(appIndent)}${app}${tagString}${options.separator}${message}`;
  return msg;
};
