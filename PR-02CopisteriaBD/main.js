var express = require('express');
var app = express();
app.set('view engine', 'pug');
// We'll use the MySql module
var mySQL = require('mysql');

// Data for stablish the connection
var connection = mySQL.createConnection(
    'mysql://root@localhost:3306/copisteria_node'
);

/* Set all printers.
Each printer will have an array for store the text in it.
*/
let printers = new Array();
for (var i = 0; i < 3; i++) {
    printers.push({
        'cola': new Array(),
        'negro': 100,
        'amarillo': 100,
        'cyan': 100,
        'magenta': 100
    });
}

/** @type {*} All vars in index view. We store them for their subsequent treatment  */
let vData = {
    title: 'Copisteria',
    cola_0: printers[0]['cola'],
    negro_0: printers[0]['negro'],
    amarillo_0: printers[0]['amarillo'],
    cyan_0: printers[0]['cyan'],
    magenta_0: printers[0]['magenta'],

    cola_1: printers[1]['cola'],
    negro_1: printers[1]['negro'],
    amarillo_1: printers[1]['amarillo'],
    cyan_1: printers[1]['cyan'],
    magenta_1: printers[1]['magenta'],

    cola_2: printers[2]['cola'],
    negro_2: printers[2]['negro'],
    amarillo_2: printers[2]['amarillo'],
    cyan_2: printers[2]['cyan'],
    magenta_2: printers[2]['magenta']
}


app.get('/', function (req, res) {
   // Stablish the connection with the DB
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    connection.query('SELECT * FROM printer', function (err, result, fields) {
        if (err) throw err;

        // For each printer we'll set its data in the printers array
        result.forEach(printer => {
            let id = printer['id'];
            printers[id]['cola'] = stringToArray(printer.cola);
            printers[id]['negro'] = printer.negro;
            printers[id]['amarillo'] = printer.amarillo;
            printers[id]['cyan'] = printer.cyan;
            printers[id]['magenta'] = printer.magenta;
        });

        // Render index.pug page using the actual data
        res.render('index', getVData());
    });

});

app.get('/send', function (req, res) {
    var response = {
        text: req.query.text,
        printer: req.query.printer
    };
    let cola_x = 'cola_' + response.printer;

    // Introduce text in the corresponding queue
    printers[response.printer][cola_x] = response.text + "_";
    // printers[response.printer]['cola'].push(response.text);
    console.log(printers[response.printer][cola_x]);
    console.log(printers);
    console.log(getVData());

    res.render('index', getVData());
});

app.get('/empty*', function (req, res) {
    // The first param is the ID
    let id = req.params[0];
    console.log(req.params);
    printers[id]['cola'] = new Array();
    res.render('index', getVData);
})

// app.get("/empty0", function (req, res) {
//     console.log(printers[0]['cola'])
//     // To vData: we reassign the data to the corresponding
//     // printer with a new (and, therefore, empty) array
//     vData.cola_0 = printers[0]['cola'] = new Array();
//     // Then, we render the view with the actual data
//     res.render('index', vData);
//     console.log(printers[0]['cola'])
//     console.log(vData)
//     // res.redirect('/');
// });

// app.get("/empty1", function (req, res) {
//     vData.cola_1 = printers[1]['cola'] = new Array();
//     res.render('index', vData);
//     // res.redirect('/');
// });

// app.get("/empty2", function (req, res) {
//     vData.cola_2 = printers[2]['cola'] = new Array();
//     res.render('index', vData);
//     // res.redirect('/');
// });

function getVData() {
    return {
        title: 'Copisteria',
        cola_0: printers[0]['cola'],
        negro_0: printers[0]['negro'],
        amarillo_0: printers[0]['amarillo'],
        cyan_0: printers[0]['cyan'],
        magenta_0: printers[0]['magenta'],
    
        cola_1: printers[1]['cola'],
        negro_1: printers[1]['negro'],
        amarillo_1: printers[1]['amarillo'],
        cyan_1: printers[1]['cyan'],
        magenta_1: printers[1]['magenta'],
    
        cola_2: printers[2]['cola'],
        negro_2: printers[2]['negro'],
        amarillo_2: printers[2]['amarillo'],
        cyan_2: printers[2]['cyan'],
        magenta_2: printers[2]['magenta']
    }
}

function stringToArray(txt) {
    var res = txt.split("_");
    if (res[(res.length) - 1] == "") {
        res.splice((res.length) - 1, res.length);
    }
    return res;
}

/** @type {*} Administration of server connection */
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
});