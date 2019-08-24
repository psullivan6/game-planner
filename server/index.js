const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { getContentTypes, getEntries } = require('./contentfulClient');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080; // set our port

app.get('/api', async (_req, res) => res.json(await getContentTypes()));

app.get('/api/:contentType', async (req, res) =>
  res.json(await getEntries(req.params.contentType))
);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on PORT:', port);
