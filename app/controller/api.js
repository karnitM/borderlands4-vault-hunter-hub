const express = require("express");
const database = require("../model/db");
const bcrypt = require("bcrypt");

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
router.get("/users", function (req, res) {
    database.getUsers(function (error, users) {
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
router.get("/weapons", function (req, res) {
    database.getWeapons(function (error, weapons) {
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
router.post("/weapons", function (req, res) {
    const weapon = req.body;

    if (!isValidWeapon(weapon)) {
        return res.status(400).json({
            error: "Invalid weapon information. Name, type and rarity are required."
        });
    }

    database.createWeapon(weapon, function (error, result) {
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
router.put("/weapons/:id", function (req, res) {
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

    database.updateWeapon(id, weapon, function (error, result) {
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
router.delete("/weapons/:id", function (req, res) {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid weapon ID"
        });
    }

    database.deleteWeapon(id, function (error, result) {
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
router.get("/builds", function (req, res) {
    database.getBuilds(function (error, builds) {
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
router.post("/builds", function (req, res) {
    const build = req.body;

    if (!isValidBuild(build)) {
        return res.status(400).json({
            error: "Invalid build information. Complete all fields."
        });
    }

    database.createBuild(build, function (error, result) {
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

// PUT - Update an existing build
router.put("/builds/:id", function (req, res) {
    const id = Number(req.params.id);
    const build = req.body;

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid build ID"
        });
    }

    if (!isValidBuild(build)) {
        return res.status(400).json({
            error: "Invalid build information. Complete all fields."
        });
    }

    database.updateBuild(id, build, function (error, result) {
        if (error) {
            console.error("Error updating build:", error.message);

            return res.status(500).json({
                error: "Could not update build"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Build not found"
            });
        }

        res.json({
            message: "Build updated successfully!",
            id: id
        });
    });
});

// DELETE - Remove an existing build
router.delete("/builds/:id", function (req, res) {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid build ID"
        });
    }

    database.deleteBuild(id, function (error, result) {
        if (error) {
            console.error("Error deleting build:", error.message);

            return res.status(500).json({
                error: "Could not delete build"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Build not found"
            });
        }

        res.json({
            message: "Build deleted successfully!",
            id: id
        });
    });
});

/* USER REGISTRATION API */

router.post("/register", async function (req, res) {
    const { username, email, password } = req.body || {};

    if (
        typeof username !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return res.status(400).json({
            error: "All fields are required."
        });
    }

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (
        cleanUsername.length < 1 ||
        cleanUsername.length > 100 ||
        cleanEmail.length > 255 ||
        !cleanEmail.includes("@") ||
        password.length < 8 ||
        Buffer.byteLength(password, "utf8") > 72
    ) {
        return res.status(400).json({
            error: "Enter a valid username, email and password of at least 8 characters (maximum 72 bytes)."
        });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 12);

        database.createUser(
            cleanUsername,
            cleanEmail,
            passwordHash,
            function (error, result) {
                if (error) {
                    if (error.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            error: "An account with this email already exists."
                        });
                    }

                    console.error("Registration error:", error.message);

                    return res.status(500).json({
                        error: "Could not create account."
                    });
                }

                res.status(201).json({
                    message: "Account created successfully!",
                    userId: result.insertId
                });
            }
        );

    } catch (error) {
        console.error("Password hashing error:", error.message);

        res.status(500).json({
            error: "Could not create account."
        });
    }
});

/* USER LOGIN API */

router.post("/login", function (req, res) {
    const { email, password } = req.body || {};

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password ||
        email.length > 255
    ) {
        return res.status(400).json({
            error: "Please enter your email and password."
        });
    }

    const cleanEmail = email.trim().toLowerCase();

    database.getUserByEmail(cleanEmail, async function (error, user) {
        if (error) {
            console.error("Login database error:", error.message);
            return res.status(500).json({
                error: "Could not log in. Please try again."
            });
        }

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password."
            });
        }

        try {
            const passwordMatches = await bcrypt.compare(
                password,
                user.password_hash
            );

            if (!passwordMatches) {
                return res.status(401).json({
                    error: "Invalid email or password."
                });
            }

            req.session.regenerate(function (sessionError) {
                if (sessionError) {
                    console.error("Session error:", sessionError.message);
                    return res.status(500).json({
                        error: "Could not start login session."
                    });
                }

                req.session.userId = user.id;
                req.session.username = user.name;

                req.session.save(function (saveError) {
                    if (saveError) {
                        console.error("Session save error:", saveError.message);
                        return res.status(500).json({
                            error: "Could not save login session."
                        });
                    }

                    res.json({
                        message: "Login successful!",
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                });
            });

        } catch (compareError) {
            console.error("Password verification error:", compareError.message);
            res.status(500).json({
                error: "Could not log in. Please try again."
            });
        }
    });
});

// POST - Log out the current user
router.post("/logout", function (req, res) {
    req.session.destroy(function (error) {
        if (error) {
            console.error("Logout error:", error.message);
            return res.status(500).json({
                error: "Could not log out."
            });
        }

        res.clearCookie("borderlands.sid", {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        res.json({
            message: "Logged out successfully!"
        });
    });
});

// GET - Check the current login session
router.get("/session", function (req, res) {
    if (!req.session.userId) {
        return res.json({
            loggedIn: false
        });
    }

    res.json({
        loggedIn: true,
        user: {
            id: req.session.userId,
            name: req.session.username
        }
    });
});

module.exports = router;
