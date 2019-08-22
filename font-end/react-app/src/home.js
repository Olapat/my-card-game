import React from 'react';
import { get, post } from './common_api';
import socket from './socket.io';

export default class Home extends React.PureComponent {
   constructor() {
      super();
      this.state = {
         playerName: sessionStorage.getItem('player_name'),
         rooms: []
      };
   };

   componentDidMount = () => {
      this.createPlayer();
      this.getRoom();

   };

   getRoom = async () => {
      const { data } = await get('/get-rooms');
      console.log(data)
      this.setState({
         rooms: data
      });
   };

   createPlayer = async () => {
      const { playerName: pn } = this.state;
      let playerName = JSON.parse(pn);

      if (!playerName || playerName === 'null') {
         playerName = prompt("Please enter your name:", "olapat");
         console.log(playerName);
         sessionStorage.setItem('player_name', JSON.stringify(playerName));
      }
      console.log(playerName);
      const { data } = await post('/create-player', { playerName });
      console.log(data);
   };

   createRoom = async () => {
      const { playerName: pn } = this.state;
      let playerName = JSON.parse(pn);

      const { data } = await post('/create-room', { playerName });
      console.log(data);
      if (data) {
         const room = {
            keyRoom: data.keyRoom,
            player: playerName,
            isPlayer: "player1"
         }
         sessionStorage.setItem('room', JSON.stringify(room));
         this.props.history.push('/game-play');
         this.getRoom();

         socket.emit('createRoom', data.keyRoom);
         socket.on('event', data => console.log(data))
      }
   };

   joinRoom = async keyRoom => {
      const { playerName: pn } = this.state;
      let playerName = JSON.parse(pn);

      socket.emit('joinRoom', keyRoom);
      socket.on('user-join', data => console.log(data));

      const { data } = await post(`/join-room-${keyRoom}`, { playerName });
      console.log(data);
      const room = {
         keyRoom: keyRoom,
         player: playerName,
         isPlayer: "player2"
      };
      if (data && data.join) this.props.history.push('/game-play');
      sessionStorage.setItem('room', JSON.stringify(room));
   };

   render() {
      const { rooms } = this.state;
      const keyRooms = Object.keys(rooms);
      return (
         <div className="content">
            <div className="row">
               <p style={{ marginRight: 12 }}>create room: </p>
               <button onClick={this.createRoom} className="btn">
                  room1
               </button>
            </div>

            {keyRooms.length > 0 && keyRooms.map((va, index) =>
               <li key={index}>
                  <button onClick={() => this.joinRoom(va)}>{"enter room-" + va}</button>
               </li>
            )}
         </div>
      )
   }
};
