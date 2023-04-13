import dotenv  from 'dotenv';
import express from 'express';

dotenv.config();


var port = process.env.PORT || 4000;



var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(4000, function () {
  console.log(`Our app is running on port:${port}`);
});
