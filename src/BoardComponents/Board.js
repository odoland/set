import React, { Component } from 'react';
import SetCard from '../helpers/setcard';
import Card from './Card';

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
  }

  // Generates 12 random cards
  componentWillMount() {
    const { rows, cols } = this.props;

    const cards = Array.from({ length: cols }, () => { // row
      return Array.from({ length: rows }, () => SetCard.generateRandomCard()) // col
    });

    this.setState({ cards });

  }

  handleClick(idx) {
    this.setState({
      clicked: [...this.state.clicked, idx]
    });
  }


  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.cards.map((row, i) => (
              <tr key={i}>
                {
                  row.map(card =>
                    <td key={card.id}>
                      <Card
                        id={card.id}
                        handleClick={this.state.handleClick}
                        clicked={this.state.clicked}
                        {...card}
                      />
                    </td>)
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board
