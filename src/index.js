#!/usr/bin/env node
const meow = require('meow');
const randimg = require('./randimg');
const {
  DEFAULT_NUMBER,
  DEFAULT_QUERY,
  DEFAULT_SHOW_NAMES,
  DEFAULT_SIZE,
} = require('./constants');

const cli = meow(
  `
    Usage
      $ randimg DEST [OPTIONS...]
 
    OPTIONS
      --query, -q  download random image according to query (default: wallpaper)
      --size, -s   image size: full, regular or small (default: full) 
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
        default: DEFAULT_QUERY,
      },
      size: {
        type: 'string',
        alias: 's',
        default: DEFAULT_SIZE,
      },
      number: {
        type: 'number',
        alias: 'n',
        default: DEFAULT_NUMBER,
      },
      showNames: {
        type: 'boolean',
        default: DEFAULT_SHOW_NAMES,
      },
    },
  },
);

randimg.eval(cli);
