const express = require("express")
const cors = require('cors')
const app = express()
app.use(cors())
const bodyParser = require("body-parser");
var mysql = require('mysql');
const PORT = process.env.PORT || 5000

app.use(express.json())
var con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12387529",
    password: "Nu1tNylzAp",
    database: "sql12387529",
    queueLimit: 0,
    connectionLimit: 0

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/', (req, res) => {
    res.send("hii")
})


app.post('/vote', (req, res) => {
    console.log(req.body, "Dd")
    const name = req.body.name;
    const vote = req.body.voting_choice;
    const time = req.body.casted_at;

    console.log(name, vote, time);
    res.send("aaaa")

    var sql = `INSERT INTO votes (id,name, voting_choice, casted_at ) VALUES (NULL,"${name}","${vote}", "${time}" )`;
    // var sql = `INSERT INTO votes (id,name, voting_choice, casted_at ) VALUES (NULL,"${name}","${vote}",STR_TO_DATE(${Date.parse(time)}, '%Y-%m-%d') )`;
    // var sql = `INSERT INTO votes (id,name, voting_choice, casted_at ) VALUES (NULL,"${name}","${vote}",STR_TO_DATE("${time}", '%Y-%m-%d') )`;
    // INSERT INTO `votes` (`id`, `name`, `voting_choice`, `casted_at`) VALUES (NULL, 'Ani', '0', CURRENT_TIMESTAMP)
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})

app.get('/data', (req, res) => {


    con.connect(function (err) {
        // if (err) throw err;
        con.query("SELECT * FROM votes", function (err, result, fields) {
            // if (err) throw err;
            console.log(typeof (result));
            res.send(result)

        });
    });
    // res.send("ani")

})


app.get('/counts', (req, res) => {
    // con.connect(function (err) {
    //     con.query(`SELECT * FROM votes where voting_choice = ${req.query.voting_choice == "true" ? 1 : 0}`, function (err, result, fields) {
    //         if (err) throw err;
    //         console.log(typeof (result));
    //         res.send(result)

    //     });
    // });
    console.log("choice api ", `SELECT count(voting_choice) as count, casted_at FROM votes where voting_choice = ${req.query.voting_choice == "true" ? "1" : "0"} group by casted_at`)
    con.connect(function (err) {
        con.query(`SELECT count(voting_choice) as count, casted_at FROM votes where voting_choice = ${req.query.voting_choice == "true" ? "1" : "0"} group by casted_at`, function (err, result, fields) {
            if (err) throw err;
            console.log(typeof (result));
            res.send(result)

        });
    });

    // Select
    //  count(created_date) as counted_leads,
    //  created_date as count_date
    // from
    //  table
    // group by
    //  created_date
    // res.send("ani")
})


app.get('/results', (req, res) => {

    console.log("choice api ", `SELECT count(voting_choice) as count, casted_at FROM votes where voting_choice = ${req.query.voting_choice == "true" ? "1" : "0"} group by casted_at`)
    con.connect(function (err) {
        con.query(`SELECT count(voting_choice) as count, voting_choice FROM votes group by voting_choice`, function (err, result, fields) {
            if (err) throw err;
            console.log(typeof (result));
            res.send(result)

        });
    });
})





app.listen(PORT, () => {
    console.log("Server Connected On", PORT)
})

// satac68757@majorsww.com
// https://remotemysql.com/
// https://cloud.ametnes.com/console/signup
// https://www.freesqldatabase.com/ pass


// Hi

// Your account number is: 483186

// Your new database is now ready to use.

// To connect to your database use these details;

// Host: sql12.freesqldatabase.com
// Database name: sql12387529
// Database user: sql12387529
// Database password: Nu1tNylzAp
// Port number: 3306

// phpMyAdmin
// phpMyAdmin is now available to administer your database. phpMyAdmin will allow you to create, edit and remove tables and to back up and import your data. Follow this link http://www.phpmyadmin.co and use the database details above to get started with your new database.

// If you have any questions or problems, please reply to this email detailing your message.

// Are you looking to host your own website? Free for 30 days, no credit card required. Includes PHP, MySQL, Email and cPanel. Click here to find out more

// Many thanks
// Freesqldatabase.com