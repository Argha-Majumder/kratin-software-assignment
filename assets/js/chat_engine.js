let socket = io.connect('http://localhost:5000');

socket.on('connect', () => {
    console.log('connected to server here');
});

socket.on('newMessage', (message) => {
    console.log('newMessage', message);
})