const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
const posts = require('./initialData');
const rateLimit = require("express-rate-limit");

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

const limiter = rateLimit({
    windowMs: 30 * 1000, 
    max: 5,
    message: "Exceed Number of API Calls"
});

app.use(limiter);

app.get('/api/posts', (req, res) => {
    if(req.query.max){
        let max = req.query.max;
        if(max <= 20){
            res.status(200).send(posts.splice(0, max));
            return;
        }
    }
    res.status(200).send(posts.splice(0, 10));
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
