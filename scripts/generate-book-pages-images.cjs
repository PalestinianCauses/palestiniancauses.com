// REVIEWED

/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const plaiceholder = require("plaiceholder");

const imagesIds = [
  "ZhaM3m5tNWzXWVdlmfBkCMB5ZmsTXvzQHedpJjhFnL4YtDuK",
  "ZhaM3m5tNWzXupgUsZLFqycP4WndTLzN26OfBisgHhIwDFav",
  "ZhaM3m5tNWzXqACWVcoriXRGFUCYnM4VwQyupegDHlAcjkT8",
  "ZhaM3m5tNWzXAZmqxTDQWCpYGiEKfnoVha73B9vycUm0dxFZ",
  "ZhaM3m5tNWzXNCfjDfI7pnld02TUuYBj7h5Z1wqxA9gG6cDe",
  "ZhaM3m5tNWzXWb2OVaBkCMB5ZmsTXvzQHedpJjhFnL4YtDuK",
  "ZhaM3m5tNWzXArrT0o9DQWCpYGiEKfnoVha73B9vycUm0dxF",
  "ZhaM3m5tNWzX7SKzcq1OKos6ixXJGbYR43yLadmgSvBOFfl0",
  "ZhaM3m5tNWzXfuzkuvpKAixQkOwjFU9IWn4ZtucV2dL16J7T",
  "ZhaM3m5tNWzXdgqPPtyQkBL6hsVXJ3nmARKb4U2IwHSCzt1N",
  "ZhaM3m5tNWzXK1bewQHqXTwp4Vz1i9W8E3u0snmYxkfd7ahP",
  "ZhaM3m5tNWzXXnaZizs3lQmOn3hCbpRi5076Djr1AqsM9WBY",
  "ZhaM3m5tNWzXlfKFA20VZU69xYRotjidFMf4EhzTDLlqwOpI",
  "ZhaM3m5tNWzXkXGSQsAurkPfhlS3pDOV7QXy4iLsB2xmwTzC",
  "ZhaM3m5tNWzXo1eOxqdL5FXyV96KwuQdHgNcAWroZRBaTbGM",
  "ZhaM3m5tNWzXuLZRmrFqycP4WndTLzN26OfBisgHhIwDFav0",
  "ZhaM3m5tNWzX5Nj1IAwVqz7pxkfvArRudnclJCswjP4WT0ay",
  "ZhaM3m5tNWzXLvJtjpXnNKVPyc6o1z4dOY8xjIQJgDWbMhaq",
  "ZhaM3m5tNWzX3TANHSvoJu8t0hRbWUeg4IxwMXVrS2KzfdY5",
];

const generatePlusStoreBlurHashes =
  async function generatePlusStoreBlurHashes() {
    const imagesProcessed = [];

    /* eslint-disable no-restricted-syntax */
    for (const imageId of imagesIds) {
      const imageSource = `https://qwvvvruhbe.ufs.sh/f/${imageId}`;

      try {
        console.log(
          `Start: processing book image no. ${imagesIds.indexOf(imageId) + 1} of ${imagesIds.length}`,
        );

        /* eslint-disable no-await-in-loop */
        const buffer = await fetch(imageSource).then(async (response) =>
          Buffer.from(await response.arrayBuffer()),
        );

        const { base64 } = await plaiceholder.getPlaiceholder(buffer);

        imagesProcessed.push({
          id: imageId,
          base64,
        });

        console.log(
          `Finish: processing book image no. ${imagesIds.indexOf(imageId) + 1} of ${imagesIds.length}`,
        );
      } catch (error) {
        console.error(
          `Error: processing book image no. ${imagesIds.indexOf(imageId) + 1} of ${imagesIds.length}`,
        );

        console.error(error);
      }
    }

    const outputPath = path.join(
      process.cwd(),
      "data",
      "book-pages-images-blur-hashes.json",
    );

    fs.writeFileSync(outputPath, JSON.stringify(imagesProcessed, null, 2));
    console.log("Generated book pages images blur hashes.");
  };

generatePlusStoreBlurHashes();
