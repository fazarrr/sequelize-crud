const db = require("../models");

const Biodata = db.biodata;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) =>{
    // Validation
    if (!req.body.nama) {
        res.status(400).send({
            message: "Nama tidak boleh kosong"
        });
        return;
    }

    // Create object
    const biodata = {
        nama: req.body.nama,
        tempat_lahir : req.body.tempat_lahir,
        tanggal_lahir : req.body.tanggal_lahir,
        alamat : req.body.alamat,
    };

    // Save data
    Biodata.create(biodata)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while insertinf biodata."
                });
            });
};

// Get all
exports.findAll = (req, res) => {
    Biodata.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error while retrieving biodata."
                });
            });
};

// Find single data
// exports.findOne = (req, res) =>{
//     Biodata.findOne({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then( data => {
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message || "Error while retrieving biodata."
//         });
//     });
// };

// PUT
exports.update = (req, res) =>{
    // Validation
    if (!req.body.nama) {
        res.status(400).send({
            message: "Nama tidak boleh kosong"
        });
        return;
    }

    Biodata.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        data.nama = req.body.nama;
        data.tempat_lahir = req.body.tempat_lahir;
        data.tanggal_lahir = req.body.tanggal_lahir;
        data.alamat = req.body.alamat;
        data.save();

        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while insertinf biodata."
        });
    });
};

// PATCH
// exports.patch = (req, res) =>{
//     Biodata.findOne({
//         where:{
//             id: req.params.id
//         }
//     })
//     .then(data => {
//         if (req.body.nama){
//             data.nama = req.body.nama;
//         }

//         if (req.body.tempat_lahir){
//             data.tempat_lahir = req.body.tempat_lahir;
//         }

//         if (req.body.tanggal_lahir){
//             data.tanggal_lahir = req.body.tanggal_lahir;
//         }

//         if (req.body.alamat){
//             data.alamat = req.body.alamat;
//         }

//         data.save();
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message || "Error while finding book."
//         });
//     });
// }

// Delete
exports.delete = (req, res) =>{
    Biodata.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(
        res.send({
            message: "Success delete id " + req.params.id + " !"
        })
    ).catch(err => {
        res.status(500).send({
            message: "Could not delete id" + req.params.id
        });
    });
};