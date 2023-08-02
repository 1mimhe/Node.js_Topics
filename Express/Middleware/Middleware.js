const express = require('express');
const app = express();

/*
Middleware functions are functions that have access to the request object (req),
the response object (res), and the next middleware function in the application’s request-response cycle.
The next middleware function is commonly denoted by a variable named next.
 */
/*
Middleware functions can perform the following tasks:
* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware function in the stack.
 */

// Creating custom Middleware
app.use(function(req, res, next) {
    console.log('Logging...');
    next(); // if we don't call next middleware, request-response cycle won't be done!
});

app.use(auth);

function auth(req, res, next) {
    console.log('Authenticating...');
    next();
}

// Built-in Middleware
app.use(express.json()); // req.body

app.use(express.static('pio'));
// serves static assets such as HTML files, images,...
// http://localhost:PORT/FileName => http://localhost:3000/readme.txt
// When a file is not found, instead of sending a 404 response, it calls next().

// Third-party Middlewares => https://expressjs.com/en/resources/middleware.html