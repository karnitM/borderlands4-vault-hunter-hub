require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const database = require("./app/model/db");
const apiRoutes = require("./app/controller/api");

const app = express();
const PORT = 3000;

// Parse JSON requests
app.use(express.json());

// Configure login sessions
app.use(session({
name: "borderlands.sid",
secret: process.env.SESSION_SECRET,
resave: false,
saveUninitialized: false,
cookie: {
httpOnly: true,
sameSite: "lax",
secure: process.env.NODE_ENV === "production",
maxAge: 1000 * 60 * 60 * 24
}
}));

// API routes
app.use("/api", apiRoutes);

// Serve website files
app.use(express.static(path.join(__dirname)));

// API status
app.get("/api", function(req, res) {
res.json({
message: "Borderlands 4 Vault Hunter Hub API is running!"
});
});

// Test MySQL connection
database.testConnection();

// Start server
app.listen(PORT, function() {
console.log(`Server running at http://localhost:${PORT}`);
});
