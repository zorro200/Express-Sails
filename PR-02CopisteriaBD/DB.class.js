var mySql = require('mysql');
/** Manage the connection to the DB and queries
 * @property {} connection has the config and data associated to the current connection
 */
module.exports = class DBconn {

    // Data for stablish the connection
    connection;

    constructor() {
        this.connection = this.connect();
    }

    /** Stablish the connection with the DB
     * @returns {mySql.Connection} returns the connection for its next use in another functions downhere
     */
    connect() {
        let conn = mySql.createConnection(
            'mysql://root@localhost:3306/copisteria_node'
        );

        console.log(conn);

        conn.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
        return conn;
    }


    /** Write and set data into the DB
     * @param {String} query It's the query that we'll treat (an INSERT, UPDATE or DELETE)
     * @param {} result It's the result of the query
     */
    write(query) {
        this.connection.connect(function (err) {
            if (err) throw err;

            conn.query(query, function (err, result) {
                if (err) throw err;
                console.log("Result" + result);
                return result;
            });
        });
    }

}