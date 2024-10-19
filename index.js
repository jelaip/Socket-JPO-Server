import express from 'express';
import http from 'http';
import ip from 'ip';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const server = http.createServer(app);
const PORT = 3000;

const io = new Server(server, {
    cors: {
        origin: '*',
        }
})
app.use(cors())
app.get('/', (req, res) => res.json('ip address: http://' + ip.address()+':'+PORT));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('msg', (msg) => {
        //broadcast to all clients
        console.log('message: ' + msg);
        socket.broadcast.emit('hashtags', [msg]);
    });
})

server.listen(PORT, () => {
    console.log('Server ip : http://' +ip.address() +":" + PORT);
})