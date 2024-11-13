// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Initial message from server to client
  // ws.send('Hello from server');

  // Handle messages received from ESP32 or client
  ws.on('message', (message) => {
    console.log(`Received from ESP32: ${message}`);
    
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Received from ESP32: ${message}`);
      }
    });
  });

  // Notify when client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log('WebSocket server is running on ws://localhost:8081');
