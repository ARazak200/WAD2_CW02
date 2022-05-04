const express = require('express');
const app = express();
require('dotenv').config() // loads data from .env file

const cookieParser = require('cookie-parser')

//const webPageRouter = require('./routes/webpagesRoutes');

app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}))

const path = require('path');
const public = path.join(__dirname, 'public');
app.use(express.static(public));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

//app.use('/', webPageRouter);
//app.use('/', authRouter);
//staff routes

const router = require('./routes/dishRoutes.js');
app.use('/', router);

app.listen(3000, () => {
  console.log('Server started on port 3000. Ctrl^c to quit.');
})  