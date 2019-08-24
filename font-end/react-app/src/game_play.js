import React from 'react';
import { get, post } from './common_api';
import socket from './socket.io';
import { storePlayer } from './reducer/store_player';
import './game_play.css';

export default class GamePlay extends React.PureComponent {
   constructor() {
      super();
      this.state = {
         dataPlayer: storePlayer.getState(),
         card: [],
         cardPlay: null,
         cardDescriptios: '',
         round: 1,
         cardIndex: 0,
         allCardPlay: [],
         cardInHand: [],
         pSelf: {
            hp: 30,
            point: 0,
            armor: 0
         },
         pEnemy: {
            hp: 30,
            point: 0,
            armor: 0
         },
         endTurn: false
      };
   };

   componentDidMount = async () => {
      this.getDataCards();
      const { dataPlayer } = this.state;
      // if (!dataPlayer) this.setState({ dataPlayer: storePlayer.getState() })
      console.log(dataPlayer.isPlayer);

      const { data } = await get('/get-card-all');
      let allCardPlay;
      let cardInHand;
      if (data && data.length > 0) {
         allCardPlay = this.shuffleIndexCard(data);
         cardInHand = [allCardPlay[0], allCardPlay[1], allCardPlay[2]];
      }
      this.setState({
         card: data,
         allCardPlay,
         cardInHand
      });

      socket.on('end-turn', data => {
         console.log(data, 'player-end');
         if (!data) return;
         if (dataPlayer && dataPlayer.isPlayer === 'player1') {
            this.setState({
               pSelf: data.player1,
               pEnemy: data.player2
            });
         } else if (dataPlayer && dataPlayer.isPlayer === 'player2') {
            this.setState({
               pSelf: data.player2,
               pEnemy: data.player1
            });
         }
         

         setTimeout(() => {
            this.startTurn();
         }, 2000);
      });
      
   };

   getDataCards = async () => {
      const { data } = await get('get-data-cards');
      console.log(data);
      this.setState({
         dataPlayer: data
      });
   };

   shuffleIndexCard = (arrayIndexCard) => {
      let IndexCard = arrayIndexCard.length,
         shuffleIndex = 0,
         valueTemporary;

      while (IndexCard--) {
         shuffleIndex = Math.floor(Math.random() * (IndexCard + 1));
         valueTemporary = arrayIndexCard[IndexCard];
         arrayIndexCard[IndexCard] = arrayIndexCard[shuffleIndex];
         arrayIndexCard[shuffleIndex] = valueTemporary;
      }
      return arrayIndexCard;
   };


   sell = () => { };

   endTurn = async () => {
      const { cardPlay, round, cardInHand: ch } = this.state;
      const playerName = sessionStorage.getItem('player_name');
      const room = sessionStorage.getItem('room');
      // const { data } = await post('/end-trun', { card: cardPlay, player: JSON.parse(playerName), room: JSON.parse(room), round });
      // console.log(data);
      // if (data && !(data.res && data.res === 'end')) {
      //    this.setState({
      //       player1: data.player1,
      //       player2: data.player2
      //    });
      // }

      let cardInHand = ch;
      const index = cardInHand.indexOf(cardPlay);
      if (index !== -1) cardInHand.splice(index, 1);
      this.setState({
         cardInHand: [...cardInHand]
      });

      socket.emit('endTurn', { 
         card: cardPlay, 
         player: JSON.parse(playerName), 
         room: JSON.parse(room), 
         round 
      });

      // socket.emit('end-turn', {
      //    card: cardPlay,
      //    room: JSON.parse(room),
      //    player: JSON.parse(playerName),
      //    round: round
      // });

      
   };

   startTurn = () => {
      this.setState(p => ({
         endTurn: false,
         round: p.round + 1
      }));
      this.pickCard();
   };

   pickCard = () => {
      const { cardIndex, allCardPlay, cardInHand } = this.state;
      const c2 = allCardPlay[cardIndex];
      this.setState({
         cardIndex: cardIndex + 1,
         cardInHand: [...cardInHand, c2]
      })
      console.log(c2);
   };

   selectCard = card => {
      const { dataPlayer } = this.state;

      const cardDescriptios = dataPlayer[card] ? dataPlayer[card].description : ''
      this.setState({
         cardPlay: card,
         cardDescriptios: cardDescriptios
      })
      console.log(card);
   };

   render() {

      const { cardInHand, pEnemy, pSelf, cardPlay, endTurn, cardDescriptios } = this.state;
      return (
         <div className="box-game-play">
            <div className="god1 bd1">
               <div className="point1 bd1">
                  <p>{pEnemy.point}</p>
               </div>
               <div className="god bd1">
                  <p id="hp1">{pEnemy.hp}</p>
                  <div className="armor bd1">
                     <p id="armor1">{pEnemy.armor <= 0 ? 0 : pEnemy.armor}</p>
                  </div>
               </div>
            </div>
            <button className="card card-all1 card-all" onClick={null}>
               Card-all1
            </button>
            <div className="card-hand1 card-hand bd1">
               <button className="card" onClick={null}>
                  card-F1
            </button>
               <button className="card" onClick={null}>
                  card-W1
            </button>
               <button className="card" onClick={null}>
                  card-G1
            </button>
            </div>
            <div className="card-play1 bd1">
               <div className="card-play">
                  <p id="card-play1"></p>
               </div>
            </div>
            <div className="hr">
               <button className="btn-sell" onClick={this.sell}>Sell</button>
               -----------------<p id="round"></p>
               <button className="btn-ok" onClick={this.endTurn} disabled={endTurn}>
                  OK
               </button>
            </div>
            <div className="card-play2 bd1">
               <div id="card-play2" className="card-play">
                  <p id="card-play2">{cardPlay && cardPlay}</p>
               </div>
               <span className="card-description">
                  {cardDescriptios}
               </span>

            </div>
            <div id="card-in-hand" className="card-hand2 card-hand bd1">
               {cardInHand.length > 0 && cardInHand.map((va, index) =>
                  <button 
                     key={index} 
                     className="card" 
                     onClick={() => this.selectCard(va)} 
                  >
                     {va}
                  </button>
               )}
            </div>
            <button id="card-all" className="card card-all2 card-all" onClick={this.pickCard} disabled={cardInHand.length >= 5}>
               Card-all2
            </button>
            <div className="god2 bd1">
               <div className="god bd1">
                  <div className="armor bd1">
                     <p id="armor2">{pSelf.armor <= 0 ? 0 : pSelf.armor}</p>
                  </div>
                  <p id="hp2">{pSelf.hp}</p>
               </div>
               <div className="point2 bd1">
                  {pSelf.point}
               </div>
            </div>
         </div>
      )
   }
};
