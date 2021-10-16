//Import requiered packages
const express = require('express');
const {Client} = require('pg');

console.log("testing")

//Create the conection to the postgres server
const client = new Client({
    connectionString: "postgres://preulkdjfcooip:2c96e22554eca8177be0eda4b2c968d4def7e0e8f882d832cdeb6e57d1e2741c@ec2-52-87-123-108.compute-1.amazonaws.com:5432/d41t5afauefh19"
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
        console.log(req.body.query);
        client.query(req.body.query, (err, r) => {
            if (err) throw err;
            rows = [];
            for(let row of r.rows){
                rows.push(row);
            }
            response = JSON.stringify(rows);
            console.log(response);
            res.end(response);
        });
    }
});

const port = process.env.PORT || 8080;

//Start listening
const server = app.listen(port, function () {
   console.log("App listening at ${host}")
});
