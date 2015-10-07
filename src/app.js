import 'babel/polyfill';
import express from 'express';
import path from 'path';
import { getListings } from './services/dataHandler.js';

export const app = express();

app.get('/listings', (req, res) => {
  getListings(req.query, data => {
    res.status(200).json(data);
  });
});

app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server-side error!');
});

app.use( (req, res, next) => {
   res.status(404).send('404: Page not Found');
});

app.listen(3000);
console.log('listening on port 3000');

