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

const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');


function importFile(file){
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data)=> {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function parseFile(file){
  return new Promise((resole, reject) => {
    parse(input, {trim: 'true'}, (err, output) => {
      if (err) reject(err);
      else resolve(output);
    })
  })
}

importFile(path.join(__dirname, './listings.csv')).then(function(value){
  console.log('value' + value);
  parseFile(value).then(function(parsedValue) {
    console.log('parsedValue' + parsedValue);
  })
});

// parse(input, {trim: 'true'}, (err, output)=> {
//     console.log(output)
// });

app.get('/listings', function(req, res){

  res.end('Here you go' + res.data);
});

app.listen(3000);
console.log('listening on port 3000');


// connection.query('SELECT * from < table name >', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
// });

