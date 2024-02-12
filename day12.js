const express = require('express');
const app = express();


const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 100;


const requestCounts = {};


const rateLimitMiddleware = (req, res, next) => {
    const ip = req.ip; 
    const currentTime = Date.now();
    

    requestCounts[ip] = requestCounts[ip] || [];
    
   
    requestCounts[ip] = requestCounts[ip].filter(time => time > currentTime - RATE_LIMIT_WINDOW_MS);
    
    // Check if the number of requests exceeds the limit
    if (requestCounts[ip].length > MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).send('Too Many Requests');
    }
    
    // Add the current request time to the count
    requestCounts[ip].push(currentTime);
    
    next(); // Proceed to the next middleware
};

// Apply the rate-limiting middleware to all routes
app.use(rateLimitMiddleware);

// Your routes and other middleware go here

// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
