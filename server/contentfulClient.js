import dotenv from 'dotenv';
import { createClient } from 'contentful';

dotenv.config();

export const client = createClient({
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

    return {
      homeTeam,
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
