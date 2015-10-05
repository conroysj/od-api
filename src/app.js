require('babel/polyfill');
const app = require('express')();
const path = require('path');
const dataHandler = require('./services/dataHandler.js')

app.get('/listings', (req, res) => {
  dataHandler.getListings(req.query, data => {
    res.status(200).json(data);
  });
});

app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server-side error!');
});

app.listen(3000);
console.log('listening on port 3000');
