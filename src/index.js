#!/usr/bin/env node
const meow = require('meow');
const randimg = require('./randimg');
const constants = require('./constants');

const cli = meow(
  `
    Usage
      $ randimg DEST [OPTIONS...]
 
    OPTIONS
      --query, -q  download random image according to query (default: wallpaper)
      --size, -s   image dimensions (width and height) in this format: 400x300 (default: 1920x1080) 
      --number, -n  number of images to download (default: 1)
      --show-names  show file names of downloaded images (default is to don't show it)
 
    EXAMPLE
      Downloads 10 random 'funny' images into ~/Pictures directory:
      $ randimg ~/Pictures -q funny -n 10
`,
  {
    flags: {
      query: {
        type: 'string',
        alias: 'q',
        default: constants.DEFAULT_QUERY,
      },
      size: {
        type: 'string',
        alias: 's',
        default: constants.DEFAULT_SIZE,
      },
      number: {
        type: 'number',
        alias: 'n',
        default: constants.DEFAULT_NUMBER,
      },
      showNames: {
        type: 'boolean',
        default: constants.DEFAULT_SHOW_NAMES,
      },
    },
  },
);

randimg.eval(cli);
