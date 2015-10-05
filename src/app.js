require('babel/polyfill');
const app = require('express')();

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'opendoor'
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

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


// connection.query('SELECT * from < table name >', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
// });

