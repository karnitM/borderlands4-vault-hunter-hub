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

// Get all users
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

// Get all weapons
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

// Add a new weapon
function createWeapon(weapon, callback) {
    const connection = mysql.createConnection(dbConfig);

    const sql = `
        INSERT INTO weapons
        (name, manufacturer, weapon_type, rarity, element, source, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        weapon.name,
        weapon.manufacturer,
        weapon.weapon_type,
        weapon.rarity,
        weapon.element,
        weapon.source,
        weapon.image
    ];

    connection.query(sql, values, function(error, result) {
        connection.end();
        callback(error, result);
    });
}

// Update an existing weapon
function updateWeapon(id, weapon, callback) {
    const connection = mysql.createConnection(dbConfig);

    const sql = `
        UPDATE weapons
        SET name = ?,
            manufacturer = ?,
            weapon_type = ?,
            rarity = ?,
            element = ?,
            source = ?,
            image = ?
        WHERE id = ?
    `;

    const values = [
        weapon.name,
        weapon.manufacturer,
        weapon.weapon_type,
        weapon.rarity,
        weapon.element,
        weapon.source,
        weapon.image,
        id
    ];

    connection.query(sql, values, function(error, result) {
        connection.end();
        callback(error, result);
    });
}

// Delete a weapon by its ID
function deleteWeapon(id, callback) {
    const connection = mysql.createConnection(dbConfig);

    const sql = "DELETE FROM weapons WHERE id = ?";

    connection.query(sql, [id], function(error, result) {
        connection.end();
        callback(error, result);
    });
}

// Get all saved Vault Hunter builds
function getBuilds(callback) {
    const connection = mysql.createConnection(dbConfig);

    const sql = `
        SELECT id, build_name, vault_hunter,
               main_weapon, description, created_at
        FROM builds
        ORDER BY created_at DESC, id DESC
    `;

    connection.query(sql, function(error, results) {
        connection.end();
        callback(error, results);
    });
}

// Save a new Vault Hunter build
function createBuild(build, callback) {
    const connection = mysql.createConnection(dbConfig);

    const sql = `
        INSERT INTO builds
        (build_name, vault_hunter, main_weapon, description)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        build.build_name,
        build.vault_hunter,
        build.main_weapon,
        build.description
    ];

    connection.query(sql, values, function(error, result) {
        connection.end();
        callback(error, result);
    });
}

// Update an existing Vault Hunter build
function updateBuild(id, build, callback) {
    const connection = mysql.createConnection(dbConfig);

    const sql = `
        UPDATE builds
        SET build_name = ?,
            vault_hunter = ?,
            main_weapon = ?,
            description = ?
        WHERE id = ?
    `;

    const values = [
        build.build_name,
        build.vault_hunter,
        build.main_weapon,
        build.description,
        id
    ];

    connection.query(sql, values, function(error, result) {
        connection.end();
        callback(error, result);
    });
}

// Delete a Vault Hunter build
function deleteBuild(id, callback) {
    const connection = mysql.createConnection(dbConfig);

    const sql = "DELETE FROM builds WHERE id = ?";

    connection.query(sql, [id], function(error, result) {
        connection.end();
        callback(error, result);
    });
}

module.exports = {
    testConnection,
    getUsers,
    getWeapons,
    createWeapon,
    updateWeapon,
    deleteWeapon,
    getBuilds,
    createBuild,
    updateBuild,
    deleteBuild
};
