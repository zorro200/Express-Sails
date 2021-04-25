var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/process_get', function (req, res) {
    var response = {
        nick: req.query.nick,
        password: req.query.password
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
});