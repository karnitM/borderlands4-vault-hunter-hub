const express = require("express");
const database = require("../model/db");

const router = express.Router();

// Get all users
router.get("/users", function(req, res) {
    database.getUsers(function(error, users) {
        if (error) {
            console.error("Error retrieving users:", error.message);

            return res.status(500).json({
                error: "Could not retrieve users"
            });
        }

        res.json(users);
    });
});

// Get all weapons
router.get("/weapons", function(req, res) {
    database.getWeapons(function(error, weapons) {
        if (error) {
            console.error("Error retrieving weapons:", error.message);

            return res.status(500).json({
                error: "Could not retrieve weapons"
            });
        }

        res.json(weapons);
    });
});

module.exports = router;
