import React, { Component } from 'react';
import './Card.css';
import SetCard from '../helpers/setcard';

class Card extends Component {

  componentDidMount() {

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

  render() {
    const { shape, color, fill, count } = this.props;
    
    let backgroundColor;
    const { isClicked } = this.props;
    
    if (isClicked) {
      backgroundColor = '#D3D3D3';
    } else {
      backgroundColor = '#ffffff';
    }


    return (
      <div
        onClick={this.props.handleClick}>        
      <canvas 
        className="Card-Canvas" 
        ref="canvas"
        style={{
          border:'1px solid #000000',
          backgroundColor // grey if clicked
        }}
        ></canvas>
        <img
          src="./img/AllSetCards.png"
          ref='image'
          alt={`${shape}${color}${fill}${count}`}
          hidden />
      </div>
    )
  }
}

export default Card;
