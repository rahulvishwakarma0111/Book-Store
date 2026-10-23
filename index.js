require("dotenv/config")
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

const booksRoutes = require('./routes/books.routes');
const authorRoutes = require('./routes/author.routes');
const { loggerMiddleware } = require('./middlewares/loggers');

// In Memory DB

// Middleware (Plugins)

app.use(express.json()) // to parse json data


app.use((req, res, next) => {
    
    console.log("I am middleware A");

    // If start server and make a request to any route, this middleware will hold on to the request 

    // return res.json({ message: "Request terminated by middleware A" });

    // This middleware is returning the response back to user and not forwarding the request to next middleware or route.

    // If we want to forward the request to next middleware or route, we have to call next() function.

    next(); // Forward the request to next middleware or route

    // now next will call middleware B, if we comment next() here, middleware B will not be called, it will call the route directly
});


app.use((req, res, next) => {
    
    console.log("I am middleware B");

    // return res.json({ message: "Request terminated by middleware B" });

    // now this middleware is terminating the request response cycle, it is not calling next(), so route will not be called

    next(); // Forward the request to next middleware or route
});


// Creating logs 

app.use(loggerMiddleware);

// Routes

app.use('/books', (req, res, next) => {
  console.log("Books route hit");
  next();
});

app.use('/books', booksRoutes);
app.use('/authors', authorRoutes);

// Here we are telling express that for any request coming to /books, use booksRoutes

// booksRoutes is a router, it has all the routes defined in it


app.listen(port, () => {
  console.log(`Book Store app listening at http://localhost:${port}`);
});




// Express has no idea how to read different kinds of data it can be plain text, json, url encoded data etc. It depends on the content type that what kind of content is coming and based on that body has to be proceeded.

// For that express has concept known as middlewares

// Middlewares are like plugins

// We can use built-in plugins or we can install plugins from npm or we can create our own plugins

// app.use(express.json()) // to parse json data

// If some data comes from the frontend and it has a header is application/json. It means it will do all the transformations for me and give me actual data in request or body


// app.use(express.urlencoded({ extended: true })) // to parse url encoded data




