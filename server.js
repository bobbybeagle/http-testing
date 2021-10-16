//Import requiered packages
const express = require('express');
const {Client} = require('pg');

//Create the conection to the postgres server
const client = new Client({
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

//Create the express app
const bodyParser = require('body-parser');
const app = express();

// parse application/json
app.use(bodyParser.json());

//Handle a post request at /query
app.post('/query', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log("Receiving request");
    if(req.body.query) {
        console.log("phase1")
        console.log(client.query(req.body.query));
        console.log("phase1.2")
        client.query(req.body.query, (err, r) => {
             console.log(err)
            if (err) throw err;
            rows = [];
            for(let row of r.rows){
                rows.push(row);
            }
             console.log("phase3")
            response = JSON.stringify(rows);
            console.log(response);
            res.end(response);
             console.log("phase4")
        });
    }
});

app.get("/", (req, res) => {
    res.send("Testing")
});

const port = process.env.PORT || 8080;

//Start listening
const server = app.listen(port, function () {
   console.log("App listening at ${host}")
});
