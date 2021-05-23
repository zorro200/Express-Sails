var express = require('express');
var app = express();
app.set('view engine', 'pug');
// We'll use the MySql module
var mySQL = require('mysql');

// Data for stablish the connection
var connection = mySQL.createConnection(
    'mysql://root@localhost:3306/copisteria_node'
);

// Stablish the connection with the DB
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

/* Set all printers.
Each printer will have an array for store the text in it.
*/
var printers = new Array();
for (var i = 0; i < 3; i++) {
    printers.push({
        'cola': new Array(),
        'negro': 0,
        'amarillo': 0,
        'cyan': 0,
        'magenta': 0
    });
}

app.get('/', function (req, res) {
    connection.query('SELECT * FROM printer', function (err, result, fields) {
        if (err) throw err;

        // For each printer we'll set its data in the printers array
        result.forEach(printer => {
            let id = printer['id'];
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
    // We'll use LET to limit the scope to the use that
    // is being given, to the variable, in this function
    let printer = req.query.printer;
    let text = req.query.text;

    if (text != "") {
        // We fill the corresponding queue with the text
        printers[printer]['cola'].push(text);

        // We get the MAX number of rows from the corresponding printer.
        let newRow = 'SELECT MAX(fila) as maxFila FROM cola WHERE idPrinter = ' + printer;
        connection.query(lastRow, function (err, result) {
            if (err) throw err;

            // Then, adding 1 to this number, we add the next row.
            newRow = result[0].maxFila + 1;

            // We INSERT a row with the corresponding fields (printer, newRow, text)
            // WARNING: if we don't put this insertion inside the block that establish the new row,
            // this one won't get the value of newRow; because it doesn't already exist.
            let insTxt = 'INSERT INTO cola VALUES (' + printer + ','
                + newRow + ',"' + text + '")';
            connection.query(insTxt, function (err) {
                if (err) throw err;
            });
        });
    }

    res.render('index', getVData());
});

app.get('/empty*', function (req, res) {
    // The first param is the ID
    var id = req.params[0];
    // console.log(req.params);
    if (printers[id]['cola'].length > 0) {
        // console.log(printers[id]['cola'])
        
        // Update the view.
        // It goes first because if we do that later, there won't be any text
        inkWaste(id);

        // The queue with the corresponding ID will be empty with a new Array
        printers[id]['cola'] = new Array();

        let emptyQueue = 'DELETE FROM cola WHERE idPrinter = ' + id;
        connection.query(emptyQueue, function (err) {
            if (err) throw err;
            console.log("Printer " + id + " queue has been emptied");
        });

        // Update the toners
        let updToners = 'UPDATE printer SET negro = ' + printers[id]['negro'] + ' WHERE id = ' + id;
        connection.query(updToners, function (err) {
            if (err) throw err;
            console.log("Printer " + id + " toners has been updated");
        });
    } else {
        console.log("Do not empty a void queue");
    }

    // Then, we render the view with the actual data
    res.render('index', getVData());
});


/** We get all data for its subsequent showed
 * @return {*} All vars in index view. We store them for their subsequent treatment
 */
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
/** Will sum all the lengths of each text and subtract that value to the one that
 * refers to black ink of the corresponding printer
 * @param {*} id Printer's ID
 * @var length sum of the lengths of each text
 */
function inkWaste(id) {
    let length = 0;
    printers[id]['cola'].forEach(txt => {
        // console.log(txt.length);
        length += txt.length;
    });
    // console.log(length);
    printers[id]['negro'] -= length;
}


/** @type {*} Administration of server connection */
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
});