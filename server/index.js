const express = require('express');
// import createError from 'http-errors';
const serverProd = require('./server.prod');
const serverDev = require('./server.dev');

// Utilities
const { getContentTypes, getEntries } = require('./contentfulClient');

// Variables
const app = express();
const port = process.env.PORT || 3000;

// Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  serverProd(app);
} else {
  serverDev(app);
}

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
