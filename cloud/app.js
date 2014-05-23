var express = require('express');
var app = express();
var fs = require('fs');


// Global app configuration section
app.set('views', 'cloud');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

app.get("*/src/*", function (req, res) {
    var file = req.params.path;
    console.log("Searching file", file);
    fs.exists(file, function (exists) {
        console.log("File exists: ", file, exists);
        if (exists) {
            res.sendfile(file);
        } else {
        }
    });
});

app.get("*", function (req, res) {
    res.render('index');
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();