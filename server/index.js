import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
import path from 'path';
import createError from 'http-errors';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.dev';
const compiler = webpack(config);

// Utilities
import { getContentTypes, getEntries } from './contentfulClient';

// Variables
const app = express();
const port = process.env.PORT || 8001;

// Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../'))); // Only resolves correctly AFTER babel compile

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.get('/api', async (_req, res) => res.json(await getContentTypes()));

app.get('/api/:contentType', async (req, res) =>
  res.json(await getEntries(req.params.contentType))
);

//
//
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on PORT:', port);
