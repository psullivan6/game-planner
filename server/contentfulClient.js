import dotenv from 'dotenv';
import { createClient } from 'contentful';

dotenv.config();

export const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN
});

// [TODO] Use once all the item parsing can be confirmed
const parseGames = items =>
  items.map(({ fields, ...rest }) => {
    // const {
    //   homeTeam: { fields: homeTeam }
    // } = fields;

    const returnFields = fields;
    returnFields.location = fields.location || fields.homeTeam.fields.stadium;

    return {
      fields: returnFields,
      ...rest
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
    .then(({ items }) => {
      if (contentType === 'games') {
        return parseGames(items);
      }

      return items;
    })
    .catch(console.error);
