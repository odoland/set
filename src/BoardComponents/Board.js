import React, { Component } from 'react';
import SetCards from '../helpers/setcard';
import Card from './Card';
import './Board.css';

/**
 * Component for displaying the board
 */
class Board extends Component {

  static defaultProps = {
    rows: 4,
    cols: 4,
  }

  constructor(props) {
    super(props);
    this.state = {
      cards: [], // Stores { shape, fill, color, count, id}
      clicked: [], // Array storing indices of clicked cards, max 3
      score: 0,
      status: "" // "right", "wrong", or "" (neutral)
    }

    this.handleClick = this.handleClick.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.drawNewCards = this.drawNewCards.bind(this);

  }

  // Generates 12 random cards
  componentWillMount() {
    const { rows, cols } = this.props;

    const cards = SetCards.generateRandomCards(rows*cols); // col

    this.setState({ cards });

  }

  handleClick(idx) {

    let clicked = this.isClicked(idx) ?
      this.state.clicked.filter(i => i !== idx)
      : [...this.state.clicked, idx];

    this.setState({ clicked }, () => {
      setTimeout(()=>this.checkWin(), 300);
    });
  }

  isClicked(idx) {
    return this.state.clicked.includes(idx);
  }

  checkWin() {

    // Must click 3 cards to check for win
    const { clicked, cards } = this.state;
    if (clicked.length < 3) {
      return;
    }

    // Grab card objects
    const cardsSelected = clicked.map(idx => cards[idx]);
    
    // Found a set 
    if (SetCards.isASet(cardsSelected)) {

      this.setState({
        cards: this.drawNewCards(),
        score: this.state.score + 1
      }, () => this.setState({clicked: []}));
    } else { // Invalid set
      console.log("Invalid set!");
      this.setState({clicked: []});
    }
  }

  drawNewCards() {
    const { cards, clicked } = this.state;
    const cardsSelected = clicked.map(idx => this.state.cards[idx]);

    // Draw new cards, remove cards selected. 
    const usedSet = new Set(cards.map(c => c.id));
    const newCards = SetCards.generateRandomCards(3, usedSet);
    const oldCards = cards.filter(c => !cardsSelected.includes(c));

    return [...oldCards, ...newCards];
  }

  render() {
    return (
      <div className="Board-Container">
        {
          this.state.cards.map((card, i) => (
            <Card
              id={card.id}
              key={card.id}
              handleClick={() => this.handleClick(i)}
              isClicked={this.isClicked(i)}
              {...card}
            />
          ))
        }
        </div>
    )
  }
  
}

export default Board
