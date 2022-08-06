const NUM_PORT = 8081

let express = require("express");
let app = express();

app.use(function(req, res, next){
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    next();
});

app.use(express.static("../static"));

app.listen(NUM_PORT, function(){
    console.log(`Serving at ${NUM_PORT}`)
});