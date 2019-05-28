import React, { Component } from 'react';
import Canvas from './Canvas';

class Card extends Component {

  componentDidMount() {

    let sprite = new Image();
    sprite.src = "./img/AllSetCards.png";

    let { shape, color, fill, count } = this.props;

    // Convert shape to find sprite
    let sx = (shape * 450) + (color * 150) + (fill * 50);
    

    // Find out how many to draw based on count
    let destinations;

    switch (count) {
      case 0 :
        destinations = [[100, 50]];
        break;
      case 1:
        destinations = [[75, 50],[125, 50]];
        break;
      case 2:
        destinations = [[50, 50],[100,50], [150,50]];
        break;
      default:
        destinations = [];
    }

    // Setting up canvas drawImage params
    let [sourcex, sourcey] = [sx, 0];
    let [sourcew, sourceh] = [48, 96];
    let [dest_w, dest_h] = [48, 96]
    let params = [
      sourcex, sourcey,
      sourcew, sourceh,
    ];
    let params2 = [
      dest_w, dest_h
    ]


    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img = this.refs.image
    img.onload = () => {
      for (let destination of destinations) {
        ctx.drawImage(sprite, ...params, ...destination, ...params2);
      }
    }

  }

  render() {
    const { shape, color, fill, count } = this.props;

    return (
      <div>
        <canvas ref="canvas"></canvas>
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
