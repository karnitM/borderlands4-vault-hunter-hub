const mysql = require("mysql2");
const dbConfig = require("../config/mysql");

function testConnection() {
    const connection = mysql.createConnection(dbConfig);

    connection.connect(function(error) {
        if (error) {
            console.error("Database connection failed:", error.message);
        } else {
            console.log("Successfully connected to Borderlands 4 database!");
        }

        connection.end();
    });
}

function getUsers(callback) {
    const connection = mysql.createConnection(dbConfig);

    connection.query(
        "SELECT id, name, email FROM users",
        function(error, results) {
            connection.end();
            callback(error, results);
        }
    );
}

function getWeapons(callback) {
    const connection = mysql.createConnection(dbConfig);

    connection.query(
        "SELECT * FROM weapons",
        function(error, results) {
            connection.end();
            callback(error, results);
        }
    );
}

module.exports = {
    testConnection,
    getUsers,
    getWeapons
};
