require('dotenv').config();
const constants = require('./constants');
const axios = require('axios');

const randimg = {
  baseUrl: 'https://api.unsplash.com/photos/random?',
  validateArguments(dest, flags) {
    if (!dest) {
      console.log('Error: Must specify destination directory');
      return false;
    }
    if (!flags.query.match('^[A-Za-z0-9]+$')) {
      console.log('Error: invalid query');
      console.log(
        'Only numbers and uppercase and lowercase english letters are allowed',
      );
      return false;
    }
    if (!flags.number > constants.MAXIMUM_NUMBER) {
      console.log(`Error: invalid number (max: ${constants.MAXIMUM_NUMBER})`);
      return false;
    }
    if (!flags.size.match('^[0-9]+x[0-9]+$')) {
      console.log('Error: invalid size format (example of usage: -s 1080x720)');
      return false;
    }
    return true;
  },

  async getImageUrls({ query, number, size }) {
    let [width, height] = size.match(/[0-9]+/g);

    const res = await axios.get(this.baseUrl, {
      params: {
        query: query,
        count: number,
        w: width,
        h: height,
      },
      headers: {
        Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
      },
    });
    return res;
  },

  async downloadImages(images) {
    for (let image of images) {
      console.log('downloading from', image.urls.custom);
    }
  },

  async eval(cli) {
    if (!this.validateArguments(cli.input[0], cli.flags)) {
      process.exit(1);
    }

    try {
      const res = await this.getImageUrls(cli.flags);
      await this.downloadImages(res.data);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }

    // download and save each the images
  },
};

module.exports = randimg;
