const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket server
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // Echo back the received message
        ws.send(message);
    });
});

// Express route for serving HTML page with WebSocket connection
app.get('/websocket', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
