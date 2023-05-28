const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin : "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(express.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Sync db.");
    })
    .catch((err) => {
        console.log("Failed sync db :" + err.message);
    });

// Import biodata controller
const biodata = require("./app/controllers/biodata.controller.js");

// Create
app.post("/", (req, res) => {
    biodata.create(req, res)
});

// Get all
app.get("/", (req, res) => {
    biodata.findAll(req, res)
});

// Get by id
// app.get("/:id", (req, res) =>{
//     biodata.findOne(req, res)
// });

// PUT
app.put("/:id", (req, res) => {
    biodata.update(req, res)
});

// PATCH
// app.patch("/:id", (req, res) => {
//     biodata.patch(req, res)
// });

// Delete
app.post("/:id", (req, res) => {
    biodata.delete(req, res)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running port ${PORT}`);
});