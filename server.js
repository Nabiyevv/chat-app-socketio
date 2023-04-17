const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000,() => console.log("http://localhost:3000/ den dinleniyor"));

app.use(express.static('public'));
// add ejs view engine
app.set('view engine', 'ejs');

const io = socket(server);

io.on('connection', socket => {
    console.log('A user connected');
    // console.log(socket.id);
    socket.on('chat-message', data => {
        // console.log(socket.id);      
        console.log('Message Sender: ' + data.sender);  
        console.log('Message: ' + data.message);        
        io.emit('chat-message', data);
    });

    socket.on('typing',() =>{
        socket.broadcast.emit('typing');
    });

    socket.on('disconnect', (info) => {
        console.log('A user disconnected');
    });
});

app.get('/',(req,res) => { 
    res.render('index');
}); 
