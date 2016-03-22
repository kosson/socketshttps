var fs       = require('fs');
var https    = require('https');
var express  = require('express');
var app      = express();
var socket   = require('socket.io');

var options = {
  key:  fs.readFileSync('niks-key.pem'),
  cert: fs.readFileSync('niks-cert.pem'),
  ciphers: 'ECDHE-RSA-AES256-SHA:AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  honorCipherOrder: true
};

var server   = https.createServer(options, app);
var io       = socket.listen(server);

var morgan   = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

io.on('connection', function (socket) {
  socket.send('bau');
  // socket.emit('eveniment', { hello: 'world' });
  socket.on('eveniment', function (data) {
    console.log(data);
  });
});
// console.log(io);
server.listen(8081);
