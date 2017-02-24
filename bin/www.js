var express = require('express');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

var app = express();
var http = require('http');

var server = http.createServer(app);
var io = require('socket.io').listen(server);

// ENV
dotenv.load({ path: '.env' });

// CONFIG
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
    process.exit();
});

// SOCKET
io.sockets.on('connection', require('../routes/socket'));


// Routes
var index = require('../routes/index');
var partials = require('../routes/partials');
var api = require('../routes/api');



// View engine
app.set('views', './views');
app.set('view engine', 'jade');


// Form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Middleware
app.use(express.static('./public'));

// Routen
app.use('/', index);
app.use('/api', api);
app.use('/partials', partials);

// Error Handling
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.redirect('/')
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Internal error');
});

app.set('port', process.env.PORT || 9001);
exports.start = function() {
    server.listen(app.get('port'), function(){
        console.log( 'Express ready on http://127.0.0.1:' + app.get('port'));
    });
};