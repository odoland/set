import React, { Component } from 'react';
import CardContainer from '../BoardContainers/CardContainer';
import './Board.css';
import PropTypes from 'prop-types';

/**
 * Component for displaying the board
 */
class Board extends Component {

  static defaultProps = {
    rows: 5,
    cols: 4,
  }

  // Generates 12 random cards
  componentWillMount() {

    const { rows, cols } = this.props;
    this.props.initCards(rows, cols);
  }

  render() {
    return (
      <div className="Board-Container">
        {
          this.props.cards.map((card, idx) => (
            <CardContainer
              idx={idx}
              key={card.id}
              {...card}
            />
          ))
        }
        </div>
    )
  }
}

Board.propTypes = {
  cards: PropTypes.array.isRequired,
  initCards: PropTypes.func.isRequired
}

export default Board;
