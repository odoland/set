import React, { Component } from 'react';
import Card from './Card';
import './Board.css';
import { connect } from 'react-redux';

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

    this.props.dispatch({
      type: 'INIT_CARDS',
      payload: { rows, cols }
    });
  }

  render() {
    return (
      <div className="Board-Container">
        {
          this.props.cards.map((card, idx) => (
            <Card
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

function mapStateToProps(state) {
  const { cards, clicked, score, status } = state;
  return { cards, clicked, score, status };
}

export default connect(mapStateToProps)(Board);
