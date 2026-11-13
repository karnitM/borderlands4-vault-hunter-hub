
const express = require("express");
const database = require("../model/db");

const router = express.Router();

// Validate weapon information
function isValidWeapon(weapon) {
    if (!weapon || typeof weapon !== "object" || Array.isArray(weapon)) {
        return false;
    }

    const requiredFields = ["name", "weapon_type", "rarity"];

    for (const field of requiredFields) {
        if (
            typeof weapon[field] !== "string" ||
            !weapon[field].trim()
        ) {
            return false;
        }
    }

    const optionalFields = [
        "manufacturer",
        "element",
        "source",
        "image"
    ];

    for (const field of optionalFields) {
        if (
            weapon[field] !== undefined &&
            weapon[field] !== null &&
            typeof weapon[field] !== "string"
        ) {
            return false;
        }
    }

    return true;
}

// GET - Retrieve all users
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

// GET - Retrieve all weapons
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

// POST - Add a new weapon
router.post("/weapons", function(req, res) {
    const weapon = req.body;

    if (!isValidWeapon(weapon)) {
        return res.status(400).json({
            error: "Invalid weapon information. Name, type and rarity are required."
        });
    }

    database.createWeapon(weapon, function(error, result) {
        if (error) {
            console.error("Error creating weapon:", error.message);

            return res.status(500).json({
                error: "Could not create weapon"
            });
        }

        res.status(201).json({
            message: "Weapon added successfully!",
            id: result.insertId
        });
    });
});

// PUT - Update an existing weapon
router.put("/weapons/:id", function(req, res) {
    const id = Number(req.params.id);
    const weapon = req.body;

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid weapon ID"
        });
    }

    if (!isValidWeapon(weapon)) {
        return res.status(400).json({
            error: "Invalid weapon information. Name, type and rarity are required."
        });
    }

    database.updateWeapon(id, weapon, function(error, result) {
        if (error) {
            console.error("Error updating weapon:", error.message);

            return res.status(500).json({
                error: "Could not update weapon"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Weapon not found"
            });
        }

        res.json({
            message: "Weapon updated successfully!",
            id: id
        });
    });
});

// DELETE - Remove an existing weapon
router.delete("/weapons/:id", function(req, res) {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid weapon ID"
        });
    }

    database.deleteWeapon(id, function(error, result) {
        if (error) {
            console.error("Error deleting weapon:", error.message);

            return res.status(500).json({
                error: "Could not delete weapon"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Weapon not found"
            });
        }

        res.json({
            message: "Weapon deleted successfully!",
            id: id
        });
    });
});


/* VAULT HUNTER BUILDS API */

// Validate build information
function isValidBuild(build) {
    if (!build || typeof build !== "object" || Array.isArray(build)) {
        return false;
    }

    const requiredFields = {
        build_name: 100,
        vault_hunter: 50,
        main_weapon: 100,
        description: 2000
    };

    for (const [field, maxLength] of Object.entries(requiredFields)) {
        if (
            typeof build[field] !== "string" ||
            !build[field].trim() ||
            build[field].length > maxLength
        ) {
            return false;
        }
    }

    const validHunters = [
        "Vex", "Rafa", "Amon",
        "Harlowe", "C4SH", "Loveless"
    ];

    return validHunters.includes(build.vault_hunter);
}

// GET - Retrieve all saved builds
router.get("/builds", function(req, res) {
    database.getBuilds(function(error, builds) {
        if (error) {
            console.error("Error retrieving builds:", error.message);

            return res.status(500).json({
                error: "Could not retrieve builds"
            });
        }

        res.json(builds);
    });
});

// POST - Save a new build
router.post("/builds", function(req, res) {
    const build = req.body;

    if (!isValidBuild(build)) {
        return res.status(400).json({
            error: "Invalid build information. Complete all fields."
        });
    }

    database.createBuild(build, function(error, result) {
        if (error) {
            console.error("Error creating build:", error.message);

            return res.status(500).json({
                error: "Could not save build"
            });
        }

        res.status(201).json({
            message: "Build saved successfully!",
            id: result.insertId
        });
    });
});


module.exports = router;
