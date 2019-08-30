import React from 'react';
import { get, post } from './common_api';
import socket from './socket.io';
import { storePlayer } from './reducer/store_player';
import './game_play.css';

export default class GamePlay extends React.PureComponent {
   constructor() {
      super();
      this.state = {
         cards: [],
         cardPlay: null,
         cardPlayEnemy: null,
         cardDescriptios: '',
         cardPoint: 0,
         round: 1,
         listPlayerWin: [],
         cardIndex: 0,
         allCardPlay: [],
         cardInHand: [],
         numCardInHandEnemy: 3,
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
         endTurn: false,
         disabledCardDeck: false,
         disabledCardInHand: false,
         disableSell: false,
         displayWinPSelf: "win-not-show",
         displayWinPEnemy: "win-not-show",
         playerWinGame: null,
         bdDisplay: false,
         room: {
            key: null,
            player1: null,
            player2: null
         }
      };
      this.dataPlayer = storePlayer.getState();

      socket.on('user-join', async data => {
         console.log(data);
         this.dataPlayer = storePlayer.getState();
         let playerEnemy;
         if (!data || !this.dataPlayer) {
            console.log("retun")
            return;
         }
         if (this.dataPlayer.isPlayer === 'player1') {
            playerEnemy = data.player2;
            console.log(playerEnemy)
         } else if (this.dataPlayer.isPlayer === 'player2') {
            playerEnemy = data.player1;
            console.log(playerEnemy)
         } else {
            console.log(this.dataPlayer)

         }
         const dataPlayer = {
            ...this.dataPlayer,
            playerEnemy
         };
         await storePlayer.dispatch({
            type: 'savePlayer',
            dataPlayer: dataPlayer
         });
         this.dataPlayer = storePlayer.getState();
      });
   };

   componentDidMount = async () => {
      this.getDataCards();
      // this.getDataRoom();

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
         if (!data) return;
         if (data && data.end === '1player') {
            if (data.isPlayer !== this.dataPlayer.isPlayer) {
               this.setState({
                  cardPlayEnemy: "?"
               });
            }
            return;
         }

         if (this.dataPlayer && this.dataPlayer.isPlayer === 'player1') {
            this.setState(prevState => ({
               pSelf: data.player1,
               pEnemy: data.player2,
               cardPlayEnemy: "?",
               listPlayerWin: [...prevState.listPlayerWin, data.playerWin],
               displayWinPSelf: data.playerWin === 'player1' ? "win-show" : "win-not-show",
               displayWinPEnemy: data.playerWin === 'player2' ? "win-show" : "win-not-show"
            }));
         } else if (this.dataPlayer && this.dataPlayer.isPlayer === 'player2') {
            this.setState(prevState => ({
               pSelf: data.player2,
               pEnemy: data.player1,
               cardPlayEnemy: "?",
               listPlayerWin: [...prevState.listPlayerWin, data.playerWin],
               displayWinPSelf: data.playerWin === 'player2' ? "win-show" : "win-not-show",
               displayWinPEnemy: data.playerWin === 'player1' ? "win-show" : "win-not-show"
            }));
         };

         console.log(data.playerWin);

         setTimeout(() => {
            const { pEnemy: { hp: hpE }, pSelf: { hp: hpS } } = this.state;
            if (hpE <= 0 || hpS <= 0) {
               this.endGame()
            } else {
               this.startTurn();
            }

         }, 3000);
      });

      socket.on('playerUpdateNumCard', data => {
         if (!data) return;
         if (!this.dataPlayer.isPlayer) return;
         if (data.isPlayer !== this.dataPlayer.isPlayer) {
            this.setState({
               numCardInHandEnemy: data.numCard
            });
         }
      });
   };

   componentDidUpdate(prevProps, prevState) {
      const cardHandLength = this.state.cardInHand.length;
      if (prevState.cardInHand !== this.state.cardInHand && this.dataPlayer.joinInRoom) {
         socket.emit('updateNumCard', {
            numCard: cardHandLength,
            room: this.dataPlayer.joinInRoom,
            isPlayer: this.dataPlayer.isPlayer,
         });
      }
   };

   getDataCards = async () => {
      const { data } = await get('get-data-cards');
      this.setState({
         cards: data
      });
   };

   getDataRoom = async () => {
      if (this.dataPlayer.joinInRoom) {
         const { data } = await get(`get-data-room=${this.dataPlayer.joinInRoom}`);
         console.log("dataRoom", data)
      }
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

   sell = async () => {
      const { cardPlay, cardPoint, cardInHand } = this.state;
      const { playerName } = this.dataPlayer;
      const { data } = await post('/sell', { name: playerName, card: cardPlay });
      if (!data) return;
      this.setState(p => ({
         pSelf: {
            ...p.pSelf,
            point: p.pSelf.point + cardPoint
         },
         cardPlay: null,
         cardDescriptios: '',
         cardPoint: 0
      }));
      this.removeCardPlay(cardInHand, cardPlay);
   };

   endTurn = async () => {
      const { cardPlay, round, cardInHand: ch } = this.state;
      // const { data } = await post('/end-trun', { card: cardPlay, player: JSON.parse(playerName), room: JSON.parse(room), round });
      // console.log(data);
      // if (data && !(data.res && data.res === 'end')) {
      //    this.setState({
      //       player1: data.player1,
      //       player2: data.player2
      //    });
      // }

      this.removeCardPlay(ch, cardPlay);

      this.setState({
         disabledCardDeck: true,
         disabledCardInHand: true,
         disableSell: true,
         endTurn: true
      });
      const { playerName, joinInRoom, isPlayer } = this.dataPlayer;
      socket.emit('endTurn', {
         card: cardPlay,
         player: playerName,
         room: {
            keyRoom: joinInRoom,
            isPlayer: isPlayer,
         },
         round
      });
   };

   removeCardPlay = (ch, cardPlay) => {
      let cardInHand = ch;
      const index = cardInHand.indexOf(cardPlay);
      if (index !== -1) cardInHand.splice(index, 1);
      this.setState({
         cardInHand: [...cardInHand]
      });
   };

   startTurn = () => {
      this.setState(p => ({
         cardPlay: null,
         cardDescriptios: null,
         endTurn: false,
         round: p.round + 1,
         cardPlayEnemy: null,
         disabledCardDeck: false,
         disabledCardInHand: false,
         disableSell: false,
         displayWinPSelf: "win-not-show",
         displayWinPEnemy: "win-not-show",
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
      const { cardPlay, cards } = this.state;

      // if ( cardPlay === card) {
      //    this.setState({
      //       cardPlay: null,
      //       cardDescriptios: null,
      //       cardPoint: 0
      //    });
      // } else {
         const cardDescriptios = cards[card] ? cards[card].description : '';
         const cardPoint = cards[card] ? cards[card].price : 0;
   
         this.setState({
            cardPlay: card,
            cardDescriptios: cardDescriptios,
            cardPoint
         });
      // };
   };

   displayNumCardInHandEnemy = () => {
      let displayer = [];
      const { numCardInHandEnemy } = this.state;
      for (let index = 0; index < numCardInHandEnemy; index++) {
         displayer.push("?");
      };
      return displayer;
   };

   endGame = () => {
      const { pEnemy: { hp: hpE }, pSelf: { hp: hpS } } = this.state;
      // if (hpE <= 0 || hpS <= 0) {
      console.log(this.dataPlayer)
      this.setState({
         cardPlay: null,
         cardDescriptios: null,
         endTurn: true,
         cardPlayEnemy: null,
         disabledCardDeck: true,
         disabledCardInHand: true,
         disableSell: true,
         displayWinPSelf: "win-not-show",
         displayWinPEnemy: "win-not-show",
         playerWinGame: hpE <= 0 ? this.dataPlayer.playerName : this.dataPlayer.playerEnemy,
         bdDisplay: true
      });
      // }
   };

   closeBackDrop = () => {
      this.setState({
         bdDisplay: false
      });
   };

   render() {
      const {
         cardInHand, pEnemy, pSelf, cardPlay, endTurn, cardDescriptios, cardPoint,
         disabledCardInHand, disabledCardDeck, disableSell, cardPlayEnemy,
         displayWinPSelf, displayWinPEnemy, playerWinGame, bdDisplay
      } = this.state;

      const marginCard = Math.floor(100 / cardInHand.length);
      return (
         <div className="box-game-play">
            {bdDisplay &&
               <div className="back-drop-end-game" onClick={null}>
                  <i className="icon-close" onClick={this.closeBackDrop}>[close]</i>
                  <p className="player-win-game">{playerWinGame}</p>
                  <p className="WIN">WIN</p>
               </div>
            }
            <div className="god1 bd1">
               <div className="point bd1">
                  <p>{pEnemy.point}</p>
               </div>
               {/* -- */}

               <div className="box-god">
                  <div className="god god-enemy bd1">
                     <img src="/fox.jpg" alt="fox" width={"100%"} height={"100%"} style={{ borderRadius: "50%" }} />
                  </div>
                  <div className="hp-bar bd1">
                     <p>{pEnemy.hp}</p>
                  </div>
                  <div className="armor-bar bd1" id={pEnemy.armor <= 0 ? "armor-bar-hidden" : ""}>
                     {pEnemy.armor > 0 && <p>{pEnemy.armor}</p>}
                  </div>
               </div>

               {/* -- */}
               
               <div className="box-display-win" id={displayWinPEnemy}>
                  <h1>WIN</h1>
               </div>
            </div>
            <button className="card-all1 card-all" onClick={null}>
               ♣
            </button>
            <div id="card-in-hand" className="card-hand1 card-hand bd1">
               {this.displayNumCardInHandEnemy().map((va, index) =>
                  <div
                     key={index}
                     className="card card1"
                  >
                     {va}
                  </div>
               )}
            </div>
            <div className="card-play1 bd1" onClick={this.endGame}>
               <div className="card-play">
                  <p id="card-play1">{cardPlayEnemy}</p>
               </div>
            </div>
            <div className="hr">
               <button className="btn-sell" onClick={this.sell} disabled={disableSell || !cardPlay}>Sell</button>
               -----------------<p id="round"></p>
               <button className="btn-ok" onClick={this.endTurn} disabled={endTurn || !cardPlay}>
                  OK
               </button>
            </div>
            <div className="card-play2 bd1">
               <div id="card-play2" className="card-play">
                  <p id="card-play2">{cardPlay && cardPlay}</p>
               </div>
               <div className="card-detail">
                  <p className="card-description">{cardDescriptios}</p>
                  <p className="card-point">sell {cardPoint} point</p>
               </div>

            </div>
            <div id="card-in-hand" className="card-hand2 card-hand bd1">
               {cardInHand.length > 0 && cardInHand.map((va, index) =>
                  <button
                     key={index}
                     className="card card2"
                     onClick={() => this.selectCard(va)}
                     // onBlur={() => this.selectCard(va)}
                     disabled={disabledCardInHand}
                     // style={
                     //    cardInHand.length > 2 ? { 
                     //       position: "absolute",
                     //       zIndex: 10 + index, 
                     //       left: index === 0 ? marginCard
                     //       : marginCard + (((233 * marginCard) / 100) * index)
                     //    }
                     //    : null
                     // }
                  >
                     {va}
                  </button>
               )}
            </div>
            <button id="card-all" className="card-all2 card-all" onClick={this.pickCard} disabled={cardInHand.length >= 5 || disabledCardDeck}>
               <p>♣</p>
            </button>
            <div className="god2 bd1">
               <div className="box-display-win" id={displayWinPSelf}>
                  <h1>WIN</h1>
               </div>
               {/* -- */}

               <div className="box-god">
               {/* id={pEnemy.armor <= 0 ? "armor-bar-hidden" : ""} */}
                  <span className="armor-bar bd1" > 
                     {/* {pSelf.armor > 0 && <p>{pSelf.armor}</p>} */}
                     <p>{pSelf.armor}</p>
                  </span>
                  <span className="hp-bar bd1">
                     {pSelf.hp}
                  </span>
                  <div className="god god-self bd1">
                     <img src="/frog2.png" alt="frog" width={"100%"} height={"100%"} style={{ borderRadius: "50%" }} />
                  </div>
               </div>


               {/* -- */}
               <div className="point bd1">
                  <p>{pSelf.point}</p>
               </div>
            </div>
         </div>
      );
   };
};
