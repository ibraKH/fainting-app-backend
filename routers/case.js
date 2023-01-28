const express = require("express");
const router = express.Router();
const pool = require('../database/connection');
const bcrypt = require('bcryptjs');


const saltRounds = process.env.SALT_ROUNDS;


// Home page route.
router.get("/", function (req, res) {
  res.send("Case Home Page");
});

// POST method to stored a new case
router.post("/new", (req,res) => {
    
})

router.get("/show/:admin", (req,res) => {
    // gets admin id with the request
    const adminId = req.params;
    console.log("here");
    if(/^[0-9]*$/.test(adminId.admin)){
        pool.connect();
        pool.query(`SELECT * FROM admins WHERE admin_id = ($1);`,[adminId.admin], (err, result) => {
        if(err){
            return console.log(err);
        }
        // Test if the given id is stored in admins table , if not dont show cases
        if(result.rowCount > 0){
            pool.query('SELECT * FROM cases;', (err , result) => {
                if(err){
                    return console.log(err);
                }
                //display the all cases to the admin
                return res.json(result.rows);
            })
        }else{
            return res.send("unauthorized access").status(404);
        }
        })
    }else{
        return res.send('please write only numbers')
    }
});

router.get("/show/case/:admin/:id", (req,res) => {
    // gets admin id with the request
    const adminId = req.params.admin;
    // gets a case id to filter based on the id
    const case_id = req.params.id;
    pool.query(`SELECT * FROM admin WHERE admin_id = $1;`,[adminId], (err, result) => {
        if(err){
            return console.log(err);
        }
        // Test if the given id is stored in admins table , if not dont show cases
        if(result.rowCount > 0){
            // filter based on case id
            pool.query('SELECT * FROM cases WHERE case_id = $1;', [case_id],  (err , result) => {
                if(err){
                    return console.log(err);
                }
                //display if the case with the same id match
                if(result.rowCount > 0){
                    return res.send(result);
                }else{
                    return res.send("No case with the id : " + case_id);
                }
            })
        }else{
            return res.send("unauthorized access").status(404);
        }
    })
});

// route for storing new case
router.post("/store/case/:device", (req, res) => {
    // gets device id with the params
    const deviceId = req.params.device;
    // gets case info with the request body
    const cases = req.body;
    // test if the device id is stored
    pool.query("SELECT * FROM device WHERE device_id = $1;", [deviceId], (err,result) => {
        if(err){
            return console.log(err);
        }

        if(result.length > 0){
            // store the case info
            pool.query("INSERT INTO cases (`case_id`,`date`,`sex`) VALUES ($1,$2,$3);", [cases.case_id, cases.date, cases.sex], (err ,result) => {
                if(err){
                    return console.log(err);
                }

                return res.send('Stored successfully');
            })
        }else{
            return res.send("unauthorized access").status(404);
        }
    })
})
module.exports = router;