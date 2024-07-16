'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

// Insert new user
wrRoute.post('/camp', function (req, res, next) {
   //let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    
    connection.execute(
        `INSERT INTO camp_d (camp_name, place, date, time, p_manager) 
         VALUES (?, ?, ?, ?, ?);`,
        [req.body.camp_name, req.body.place, req.body.date,req.body.time,req.body.p_manager]
    ).then(() => {
        console.log('camp inserted successfully');
        res.status(201).send("Insert Successfully.");
    }).catch((err) => {
        console.error('Error inserting camp:', err);
        res.status(500).send("Error inserting user.");
    });
});

// Get all users
wrRoute.get('/camp', function (req, res, next) {
    connection.execute('SELECT * FROM camp_d;')
        .then((result) => {
            var rawData = result[0];
            res.send(JSON.stringify(rawData));
        }).catch((err) => {
            console.error('Error fetching users:', err);
            res.status(500).send("Error fetching users.");
        });
});

// Check user credentials
wrRoute.post('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    
    connection.execute('SELECT * FROM camp_d WHERE camp_name=?;',
    [req.body.camp_name,]).then((result) => {
        var data = result[0];
        if (data.length === 0) {
           res.sendStatus(400); // No matching user found
        } else {
           res.sendStatus(200); // Matching user found
        }
     }).catch((err) => {
        console.error('Error checking user:', err);
        res.status(500).send("Error checking user.");
     });
 });

// Handle 404 for undefined routes
wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = wrRoute;