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
 
    EXAMPLE
      $ randimg ~/Pictures -q funny -n 10
      Download 10 random 'funny' images
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
    },
  },
);

randimg.eval(cli);
