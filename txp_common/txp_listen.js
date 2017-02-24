var express = require('express');

var app =express();

app.use(express.static(__dirname));

app.post('/ajax.json', function (req, res) {
res.sendFile( __dirname + "/" + "ajax.json" );
});

var server  = app.listen(8066, '127.0.0.1');
