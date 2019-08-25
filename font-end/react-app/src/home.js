import React from 'react';
import { get, post } from './common_api';
import socket from './socket.io';
import { storePlayer } from './reducer/store_player';

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
      // console.log(data)
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
         storePlayer.dispatch({
            type: 'savePlayer',
            dataPlayer: { playerName }
         });
      }
      // console.log(playerName);
      //const { data } = await 
      post('/create-player', { playerName });
      // console.log(data);
   };

   createRoom = async () => {
      const { playerName: pn } = this.state;
      let playerName = JSON.parse(pn);

      const { data } = await post('/create-room', { playerName });
      if (data) {
         const dataPlayer = {
            joinInRoom: data.keyRoom.toString(),
            playerName: playerName,
            isPlayer: "player1"
         };
         await storePlayer.dispatch({
            type: 'savePlayer',
            dataPlayer: dataPlayer
         });
         // sessionStorage.setItem('room', JSON.stringify(room));
         // this.getRoom();

         socket.emit('createRoom', data.keyRoom.toString());
         // socket.on('event', data => console.log(data));
         this.props.history.push('/game-play');
      }
   };

   joinRoom = async keyRoom => {
      const { playerName: pn } = this.state;
      let playerName = JSON.parse(pn);

      socket.emit('joinRoom', keyRoom);
      // socket.on('user-join', data => console.log(data));

      const { data } = await post(`/join-room-${keyRoom}`, { playerName });
      console.log(data);
      const dataPlayer = {
         joinInRoom: keyRoom,
         playerName: playerName,
         isPlayer: "player2"
      };
      storePlayer.dispatch({
         type: 'savePlayer',
         dataPlayer: dataPlayer
      });
      if (data && data.join) this.props.history.push('/game-play');
      // sessionStorage.setItem('room', JSON.stringify(room));
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
