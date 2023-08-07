const http = require('http');
const app = require('./app');

//setting port to run on
const port = process.env.port || 3000;

//create http server
const server = http.createServer(app);

//start listening
app.listen(port);