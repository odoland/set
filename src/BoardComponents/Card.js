import React, { Component } from 'react';
import './Card.css';
import SetCard from '../helpers/setcard';
import PropTypes from 'prop-types';

/** 
 * Class that represents a set Card Component 
 * 
 */
class Card extends Component {

  componentDidMount() {
    // Draws a card with canvas

    let sprite = new Image();
    sprite.src = "./img/AllSetCards.png";

    // get the ctx.drawImage parameters to draw based on the 4 elements
    const { shape, color, fill, count } = this.props;
    const { params1, destinations, params2 } = SetCard.getDrawingParams({ shape, color, fill, count });

    // Load the canvas and image to draw on
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img = this.refs.image

    // Draw the Set Cards for each x-position destination
    img.onload = () => {
      // draw image
      for (let destinationX of destinations) {
        ctx.drawImage(sprite, ...params1, destinationX, ...params2);
      }
    }
  }

  handleClick = (evt, idx) => {
    evt.preventDefault();

    // Register click
    this.props.registerClick(idx);

    // Check if there is a win
    setTimeout(this.props.checkClick, 400);
    setTimeout(this.props.stopFlashes, 500);

  }

  getBackgroundColor = () => {
    const { clicked, status, idx } = this.props;
    const isClicked = clicked.includes(idx);
    let backgroundColor;
    switch(status) {
      case 'wrong': // red : white
        backgroundColor = (isClicked) ? '#ffb2b2' : '#ffffff';
        break;
      case 'right':
        backgroundColor = '#ffffff';
        break;
      default: // gray : white
        backgroundColor = (isClicked) ? '#D3D3D3' : '#ffffff';
    } 
    return backgroundColor;
  }

  render() {

    const { shape, color, fill, count, idx } = this.props;

    const backgroundColor = this.getBackgroundColor();
    
    return (
      <div
        onClick={e=>this.handleClick(e, idx)}>        
        <canvas 
          className="Card-Canvas" 
          ref="canvas"
          style={{
            border:'1px solid #000000',
            backgroundColor // grey if clicked
          }}>
        </canvas>
        <img
          src="./img/AllSetCards.png"
          ref='image'
          alt={`${shape}${color}${fill}${count}`}
          hidden/>
      </div>
    )
  }
}

Card.propTypes = {
  shape: PropTypes.oneOf([0,1,2]).isRequired,
  count: PropTypes.oneOf([0,1,2]).isRequired,
  color: PropTypes.oneOf([0,1,2]).isRequired,
  fill: PropTypes.oneOf([0,1,2]).isRequired,
  idx: PropTypes.number.isRequired,

  registerClick: PropTypes.func.isRequired,
  checkClick: PropTypes.func.isRequired,
  stopFlashes: PropTypes.func.isRequired
}


export default Card;
