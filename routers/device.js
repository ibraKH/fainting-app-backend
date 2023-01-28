const express = require("express");
const router = express.Router();
const pool = require('../database/connection');

// Home page route.
router.get("/", function (req, res) {
  res.send("Device Home Page");
});

// Create new device
router.post('/new/:admin_id', async (req, res) => {
  const admin_id = req.params.admin_id;

  const conn = await pool.connect();
  const adminExist = await conn.query("SELECT * FROM admins WHERE admin_id = ($1);", [admin_id]);

  // Get device data
  const device = {
      id: req.body.id,
      year: req.body.year,
      name: req.body.name,
  }

  if(adminExist.rowCount > 0){
      // Test duplicated id
      const duplicateID = await conn.query("SELECT * FROM devices WHERE device_id = ($1);", [device.id]);
      if(duplicateID.rows[0] !== undefined) return res.send('Duplicate device id');
      
      conn.query("INSERT INTO devices (device_id,model_year,device_name) VALUES ($1,$2,$3);", [device.id, device.year, device.name] ,(err, result) => {
      if(err) console.log(err);

      return res.send('New Device Stored');
    })
    }else{
      return res.send('Please enter admin id');
    }
});

// Get All devices 
router.get('/show/:admin_id', async (req , res) => {
  const admin_id = req.params.admin_id;

  const conn = await pool.connect();
  const adminExist = await conn.query("SELECT * FROM admins WHERE admin_id = ($1);", [admin_id]);
  if(adminExist.rowCount > 0){
      conn.query("SELECT * FROM devices;", (err, result) => {
          if(err) console.log(err);

          return res.send(result.rows);
      })
  }else{
      return res.send('Please enter admin id');
  }
});
module.exports = router;