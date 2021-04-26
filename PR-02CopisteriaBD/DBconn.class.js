var mySql = require('mysql');

module.exports = class DBconn {

    // Data for stablish the connection
    connection;

    constructor() {
        this.connection = this.connect();
    }

    /** Stablish the connection with the DB
     * @returns {mySql.Connection}
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


}