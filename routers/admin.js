const express = require("express");
const router = express.Router();
const pool = require('../database/connection');
const bcrypt = require('bcryptjs');


const saltRounds = process.env.SALT_ROUNDS;


// Home page route.
router.get("/", function (req, res) {
  res.send("Admin Home Page");
});

// Create new admin
router.post('/new', async (req, res) => {
    // Connect to Postgres database
    const conn = await pool.connect();

    // Get user data
    const user = {
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password,
    }

    // Test duplicated id
    const duplicateID = await conn.query("SELECT * FROM admins WHERE admin_id = ($1);", [user.id]);
    if(duplicateID.rows[0] !== undefined) return res.send('Duplicate id');
    const hash = bcrypt.hashSync(
        user.password,
        parseInt(saltRounds)
    )

    conn.query("INSERT INTO admins (admin_id,admin_name,admin_phone,admin_address,username,password) VALUES ($1,$2,$3,$4,$5,$6);", [user.id, user.name, user.phone, user.address, user.username, hash], (err, result) => {
        if(err) console.log(err);

        return res.send('insert successfully')
    });
});

// Get All admins 
router.get('/show/:admin_id', async (req , res) => {
    const admin_id = req.params.admin_id;

    const conn = await pool.connect();
    const adminExist = await conn.query("SELECT * FROM admins WHERE admin_id = ($1);", [admin_id]);
    if(adminExist.rowCount > 0){
        conn.query("SELECT admin_name,admin_phone FROM admins;", (err, result) => {
            if(err) console.log(err);

            return res.send(result.rows);
        })
    }else{
        return res.send('Please enter admin id');
    }
})

// Login admin
router.post("/show", (req,res) => {
    // gets admin id with the request
    const admin = {
        username: req.body.username,
        password: req.body.password
    }

    pool.connect();
    pool.query(`SELECT * FROM admins WHERE username = ($1);`,[admin.username], async (err, result) => {
        if(err){
            return console.log(err);
        }
        
        // Test if the given id is stored in admins table
        if(result.rowCount > 0){
            // test the password
            const pass = await bcrypt.compare(admin.password, result.rows[0].password);
            const id = result.rows[0].admin_id;
            if(pass){
                return res.send(`${id}`);
            }else{
                return res.send('invalid');
            }
        }else{
            return res.send("invalid").status(404);
        }
    })
});
module.exports = router;