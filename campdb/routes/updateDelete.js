
'use strict';

const express = require('express');
const udRoute = express.Router();
const connection = require('../db');

udRoute.put('/camp/:uid', function (req, res, next) {
    const { camp_name } = req.body;
    const { place } = req.body;
    const { date } = req.body;
    const { time } = req.body;
    const { p_manager } = req.body;
    const { uid } = req.params;

    // Validate inputs
    if (!camp_name) {
        console.error('Validation error: campName is required .');
        return res.status(400).send("campName are required.");
    }

    connection.execute(
        "UPDATE camp_d SET camp_name=?, place=?, date=? ,time=? ,p_manager=? WHERE id=?;",
        [camp_name,place,date,time,p_manager,uid]
    ).then(() => {
        console.log(`camp with ID ${uid} updated successfully`);
        res.status(200).send("Update Successfully.");
    }).catch((err) => {
        console.error('Error updating user:', err);
        res.status(500).send("Error updating camp.");
    });
});

udRoute.delete('/camp/:uid', function (req, res, next) {
    const { uid } = req.params;

    connection.execute(
        "DELETE FROM camp_d WHERE id=?;",
        [uid]
    ).then(() => {
        console.log(`camp with ID ${uid} deleted successfully`);
        res.status(200).send("Delete Successfully.");
    }).catch((err) => {
        console.error('Error deleting user:', err);
        res.status(500).send("Error deleting camp.");
    });
});

udRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = udRoute;
