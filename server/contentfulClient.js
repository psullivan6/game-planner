require('dotenv').config();

const contentful = require('contentful');

export const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN
});

// [TODO] Use once all the item parsing can be confirmed
const parseGames = items =>
  items.map(({ fields }) => {
    const { fields: stadium } =
      fields.location || fields.homeTeam.fields.stadium;
    const {
      homeTeam: { fields: homeTeam }
    } = fields;

    console.log('DATA', homeTeam, '\n\n', stadium, '\n\n\n');

    return {
      homeTeam: fields.homeTeam,
      stadium
    };
  });

export const getContentTypes = () =>
  client.getContentTypes().then(response => response.items);

export const getEntries = contentType =>
  client
    .getEntries({
      content_type: contentType,
      include: 3
    })
    .then(({ items }) => items)
    .catch(console.error);
