const express = require("express");
const path = require("path");
const database = require("./app/model/db");
const apiRoutes = require("./app/controller/api");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname)));

app.get("/api", function(req, res) {
    res.json({
        message: "Borderlands 4 Vault Hunter Hub API is running!"
    });
});

database.testConnection();

app.listen(PORT, function() {
    console.log(`Server running at http://localhost:${PORT}`);
});
