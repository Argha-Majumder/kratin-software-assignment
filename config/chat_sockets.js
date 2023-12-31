module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io') (socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
    io.sockets.on('connection', (socket) => {
        console.log('new connection received', socket.id);

        
    });
}