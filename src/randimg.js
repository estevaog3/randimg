const { MAXIMUM_NUMBER } = require('./constants');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { ACCESS_KEY } = require('./secret/unsplash');

if (!ACCESS_KEY) {
  console.log('Error: ACCESS_KEY not found');
  process.exit(1);
}

const randimg = {
  baseUrl: 'https://api.unsplash.com/photos/random',
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
    if (!flags.number > MAXIMUM_NUMBER) {
      console.log(`Error: invalid number (max: ${MAXIMUM_NUMBER})`);
      return false;
    }
    if (!flags.size.match('full|regular|small')) {
      console.log(
        'Error: invalid size, it should be either full, regular or small',
      );
      return false;
    }
    return true;
  },

  async getImageUrls({ query, number }) {
    const res = await axios.get(this.baseUrl, {
      params: {
        query: query,
        count: number,
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });
    return res;
  },

  async downloadImages(images, size) {
    let promises = [];
    let fileNames = [];
    for (let image of images) {
      const url = image.urls[size];
      promises.push(axios.get(url, { responseType: 'stream' }));
      let fileName = image.alt_description
        ? image.alt_description
        : image.description
        ? image.description
        : image.id;
      fileName = fileName.split(/[ /]/).join('-');
      fileNames.push(`${fileName}.jpg`);
    }
    return { promises: await Promise.all(promises), fileNames };
  },

  saveImages(images, dir, { showNames }) {
    if (!fs.existsSync(dir)) {
      throw new Error(`Directory ${dir} does not exists`);
    }

    images.fileNames.map((fileName, i) => {
      images.promises[i].data.pipe(
        fs.createWriteStream(path.join(dir, fileName)),
      );
      if (showNames) {
        console.log(fileName);
      }
    });
  },

  async eval(cli) {
    if (!this.validateArguments(cli.input[0], cli.flags)) {
      process.exit(1);
    }

    try {
      const res = await this.getImageUrls(cli.flags);
      const images = await this.downloadImages(res.data, cli.flags.size);
      this.saveImages(images, path.resolve(process.cwd(), cli.input[0]), {
        showNames: cli.flags.showNames,
      });
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  },
};

module.exports = randimg;
