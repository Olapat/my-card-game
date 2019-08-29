import io from 'socket.io-client';

var socket = io("http://localhost:7000");
// socket.emit('chat message', 'Hello name olapat');

socket.on('event', data => {
    // console.log(data);
});
// socket.on('user-join', data => {
//     console.log(data);
// });


export default socket;
