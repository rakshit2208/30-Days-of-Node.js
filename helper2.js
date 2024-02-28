const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    // Store connected clients
    const clients = new Set();

    wss.on('connection', (ws) => {
        // Add new client to the set
        clients.add(ws);

        ws.on('message', (message) => {
            // Broadcast message to all clients
            broadcast(message, ws);
        });

       
        ws.on('close', () => {
            // Remove disconnected client from the set
            clients.delete(ws);
        });
    });

   
    function broadcast(message, sender) {
        clients.forEach(client => {
            // Send message to all clients except the sender
            if (client !== sender && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

module.exports = setupWebSocketServer;
