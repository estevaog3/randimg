# randimg

`randimg` is a Minimalist non-interactive CLI random image downloader built with NodeJS. It's powered by [unsplash](https://unsplash.com).

## Usage

### Pre requirements

1. Create a [unsplash developer account](https://unsplash.com/developers) if you don't have already - don't worry, it's free :)
2. After signing up, create an unsplash application

### How to run

1. Clone this repository
2. Install dependencies:

```
yarn install
```

3. Copy your unsplash app's `ACCESS_KEY` and replace `*****` with it in this command:

```
mkdir src/secrets && \
echo "module.exports.ACCESS_KEY = '*****';" > src/secrets/unsplash.js
```

4. That's it! You can now install it globally with `yarn build` or execute it without installing: `yarn execute`
