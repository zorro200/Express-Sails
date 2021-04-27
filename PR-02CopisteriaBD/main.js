var express = require('express');
var app = express();
app.set('view engine', 'pug');
// We'll use the MySql module
var mySql = require('mysql');
// We'll use the class that I made for the db connection
var DBconn = require('./DB.class.js');

/* Set all printers. 
Each printer will have an array for store the text in it.
*/
let printers = new Array();
let printer0 = { 'cola_0': new Array(), 'negro_0': 100, 'amarillo_0': 100, 'cyan_0': 100, 'magenta_0': 100 };
let printer1 = { 'cola_1': new Array(), 'negro_1': 100, 'amarillo_1': 100, 'cyan_1': 100, 'magenta_1': 100 };
let printer2 = { 'cola_2': new Array(), 'negro_2': 100, 'amarillo_2': 100, 'cyan_2': 100, 'magenta_2': 100 };
printers.push(printer0);
printers.push(printer1);
printers.push(printer2);

/** @type {*} All vars in index view. We store them for their subsequent treatment  */
let vData = {
    title: 'Copisteria',
    cola_0: printers[0]['cola_0'],
    negro_0: printers[0]['negro_0'],
    amarillo_0: printers[0]['amarillo_0'],
    cyan_0: printers[0]['cyan_0'],
    magenta_0: printers[0]['magenta_0'],

    cola_1: printers[1]['cola_1'],
    negro_1: printers[1]['negro_1'],
    amarillo_1: printers[1]['amarillo_1'],
    cyan_1: printers[1]['cyan_1'],
    magenta_1: printers[1]['magenta_1'],

    cola_2: printers[2]['cola_2'],
    negro_2: printers[2]['negro_2'],
    amarillo_2: printers[2]['amarillo_2'],
    cyan_2: printers[2]['cyan_2'],
    magenta_2: printers[2]['magenta_2']
}

/** We'll get the data from the DB: 
 * @name initialVD initialViewData
*/
function initialVD() {
    new DBconn();
}

app.get('/', function (req, res) {  
    initialVD();
    res.render('index', vData);
});

app.get('/send', function (req, res) {
    var response = {
        text: req.query.text,
        printer: req.query.printer
    };
    let cola_x = 'cola_' + response.printer;

    // Introduce text into de correspondent queue
    printers[response.printer][cola_x].push(response.text);
    // console.log(printers);

    res.render('index', vData);
});

app.get("/empty0", function (req, res) {
    console.log(printers[0]['cola_0'])
    // To vData: we reassign the data to the corresponding
        // printer with a new (and, therefore, empty) array
    vData.cola_0 = printers[0]['cola_0'] = new Array();
    // Then, we render the view with the actual data
    res.render('index', vData);
    console.log(printers[0]['cola_0'])
    console.log(vData)
    // res.redirect('/');
});

app.get("/empty1", function (req, res) {
    vData.cola_1 = printers[1]['cola_1'] = new Array();
    res.render('index', vData);
    // res.redirect('/');
});

app.get("/empty2", function (req, res) {
    vData.cola_2 = printers[2]['cola_2'] = new Array();
    res.render('index', vData);
    // res.redirect('/');
});

/** @type {*} Administration of server connection */
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
});