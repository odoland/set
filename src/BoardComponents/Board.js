import React, { Component } from 'react';
import SetCard from '../helpers/setcard';
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
      cards: [],
      clicked: [], // Array storing indices of clicked cards, max 3
      score: 0,
    }

    this.handleClick = this.handleClick.bind(this);
    this.checkWin = this.checkWin.bind(this);

  }

  // Generates 12 random cards
  componentWillMount() {
    const { rows, cols } = this.props;

    const cards = Array.from({ length: rows * cols }, () => SetCard.generateRandomCard()); // col


    this.setState({ cards });

  }

  handleClick(idx) {

    let clicked = this.isClicked(idx) ?
      this.state.clicked.filter(i => i !== idx)
      : [...this.state.clicked, idx];

    this.setState({ clicked }, this.checkWin);
  }

  isClicked(idx) {
    return this.state.clicked.includes(idx);
  }

  checkWin() {

    // Must click 3 cards to check for win
    const { clicked } = this.state;
    if (clicked.length < 3) {
      return;
    }

    // Grab card objects
    const { rows } = this.props;
    let cards = clicked.map(idx => this.state.cards[idx]);
    if (SetCard.isASet(cards)) {
      console.log("Found a set!");
      // const newCards = Array.from({length: 3}, () => SetCard.generateRandomCard());
      // TODO: flash green
      // TODO:  Create helper function for filtering 2D array, and drawing new random cards.
    } else {
      console.log("Invalid set!");
      // TODO: Flash red
    }

    this.setState({
      clicked: []
    })

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
