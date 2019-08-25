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
         displayWinPEnemy: "win-not-show"
      };
   };

   componentDidMount = async () => {
      this.getDataCards();
      const { dataPlayer } = this.state;
      // if (!dataPlayer) this.setState({ dataPlayer: storePlayer.getState() })

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
            if (data.isPlayer !== dataPlayer.isPlayer) {
               this.setState({
                  cardPlayEnemy: "?"
               });
            }
            return;
         }

         if (dataPlayer && dataPlayer.isPlayer === 'player1') {
            this.setState(prevState => ({
               pSelf: data.player1,
               pEnemy: data.player2,
               cardPlayEnemy: "?",
               listPlayerWin: [...prevState.listPlayerWin, data.playerWin],
               displayWinPSelf: data.playerWin === 'player1' ? "win-show" : "win-not-show",
               displayWinPEnemy: data.playerWin === 'player2' ? "win-show" : "win-not-show"
            }));
         } else if (dataPlayer && dataPlayer.isPlayer === 'player2') {
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
            this.startTurn();
         }, 3000);
      });

      socket.on('playerUpdateNumCard', data => {
         if (!data) return;
         if (!dataPlayer.isPlayer) return;
         if (data.isPlayer !== dataPlayer.isPlayer) {
            this.setState({
               numCardInHandEnemy: data.numCard
            });
         }
      });
   };

   componentDidUpdate(prevProps, prevState) {
      const cardHandLength = this.state.cardInHand.length;
      if (prevState.cardInHand !== this.state.cardInHand && this.state.dataPlayer.joinInRoom) {
         socket.emit('updateNumCard', {
            numCard: cardHandLength,
            room: this.state.dataPlayer.joinInRoom,
            isPlayer: this.state.dataPlayer.isPlayer,
         });
      }
   };

   getDataCards = async () => {
      const { data } = await get('get-data-cards');
      this.setState({
         cards: data
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

   sell = async () => {
      const { cardPlay, cardPoint, cardInHand, dataPlayer: { playerName } } = this.state;
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
      const { cardPlay, round, cardInHand: ch, dataPlayer } = this.state;
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
         disableSell: true
      });
      socket.emit('endTurn', {
         card: cardPlay,
         player: dataPlayer.playerName,
         room: {
            keyRoom: dataPlayer.joinInRoom,
            isPlayer: dataPlayer.isPlayer,
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
         endTurn: false,
         round: p.round + 1,
         cardPlayEnemy: null,
         disabledCardDeck: false,
         disabledCardInHand: false,
         disableSell: false,
         displayWinPSelf: "win-not-show",
         displayWinPEnemy: "win-not-show"
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
      const { cards } = this.state;

      const cardDescriptios = cards[card] ? cards[card].description : ''
      const cardPoint = cards[card] ? cards[card].price : 0
      this.setState({
         cardPlay: card,
         cardDescriptios: cardDescriptios,
         cardPoint
      })
   };

   displayNumCardInHandEnemy = () => {
      let displayer = [];
      const { numCardInHandEnemy } = this.state;
      for (let index = 0; index < numCardInHandEnemy; index++) {
         displayer.push("?");
      };
      return displayer;
   };

   render() {
      const { cardInHand, pEnemy, pSelf, cardPlay, endTurn, cardDescriptios, cardPoint, disabledCardInHand,
         disabledCardDeck, disableSell, cardPlayEnemy, displayWinPSelf, displayWinPEnemy } = this.state;

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
               <div className="box-display-win" id={displayWinPEnemy}>
                  <h1>WIN</h1>
               </div>
            </div>
            <button className="card card-all1 card-all" onClick={null}>
               Card-all1
            </button>
            <div id="card-in-hand" className="card-hand1 card-hand bd1">
               {this.displayNumCardInHandEnemy().map((va, index) =>
                  <div
                     key={index}
                     className="card"
                  >
                     {va}
                  </div>
               )}
            </div>
            <div className="card-play1 bd1">
               <div className="card-play">
                  <p id="card-play1">{cardPlayEnemy}</p>
               </div>
            </div>
            <div className="hr">
               <button className="btn-sell" onClick={this.sell} disabled={disableSell}>Sell</button>
               -----------------<p id="round"></p>
               <button className="btn-ok" onClick={this.endTurn} disabled={endTurn}>
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
                     className="card"
                     onClick={() => this.selectCard(va)}
                     disabled={disabledCardInHand}
                  >
                     {va}
                  </button>
               )}
            </div>
            <button id="card-all" className="card card-all2 card-all" onClick={this.pickCard} disabled={cardInHand.length >= 5 || disabledCardDeck}>
               Card-all2
            </button>
            <div className="god2 bd1">
               <div className="box-display-win" id={displayWinPSelf}>
                  <h1>WIN</h1>
               </div>
               <div className="god bd1">
                  <div className="armor bd1">
                     <p id="armor2">{pSelf.armor <= 0 ? 0 : pSelf.armor}</p>
                  </div>
                  <p id="hp2">{pSelf.hp}</p>
               </div>
               <div className="point2 bd1">
                  <p>point</p>
                  <p>{pSelf.point}</p>
               </div>
            </div>
         </div>
      )
   }
};
