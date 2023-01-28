// Web server
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const admin = require('./routers/admin');
const cases = require('./routers/case');
const device = require('./routers/device');
// Declare a port
const port = process.env.PORT || 3002;



// to get body request in the method post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routers 
app.use("/admin", admin);
app.use("/case", cases);
app.use("/device", device);

// HTTP request method :
// GET POST PUT DELETE

// GET method for the main route (Home Page)
app.get("/", (req,res) => {
    res.send('Home page')
})

app.listen(port, (err) => err ? console.log(err) : console.log("Listening at port " + port));