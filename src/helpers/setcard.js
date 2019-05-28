import uuid from 'uuid/v4';

class SetCard {

  /** Randomly generates a random set card.
   * Each attribute is an int from 0, 1, 2
   */
  static generateRandomCard() {
    const randomNums = Array.from({ length: 4 }, () => ~~(Math.random() * 3));
    const [shape, fill, count, color] = randomNums;
    return { shape, fill, count, color, id: uuid() };
  }

  /**
   * Gets the parameters for canvas.drawImage based on the shape, fill count and color
   * Returns the parameters to use. (params1 and params2 must be spread.
   * Destination is an array of 1, 2 or 3 elements for the x-positions to draw.
   * 
   */
  static getDrawingParams({ shape, color, fill, count }) {

    // Convert shape to find pixel location of the sprite
    let sx = (shape * 450) + (color * 150) + (fill * 50);

    // Find out how many shapes to draw based on count
    let destinations;

    switch (count) {
      case 0:
        destinations = [125];
        break;
      case 1:
        destinations = [100, 150];
        break;
      case 2:
        destinations = [75, 125, 175];
        break;
      default:
        destinations = [];
    }

    // Setting up canvas drawImage params
    const [sourcex, sourcey] = [sx, 0];
    const [sourcew, sourceh] = [48, 96];
    const [dest_y, dest_w, dest_h] = [25, 48, 96]

    const params1 = [
      sourcex, sourcey,
      sourcew, sourceh,
    ];

    const params2 = [
      dest_y, dest_w, dest_h
    ];

    return { params1, destinations, params2 };
  }

  /**
   * 
   * @param {array} cardsArr - array of sets { shape,  fill , counts , color , id}
   */
  static isASet(cardsArr) {

    // Remove id from card array
    const cards = cardsArr.map(c => {
      let { id, ...card } = c;
      return card;
    });

    return cards
      .map(card => { // Convert obj to array form
        const { shape, fill, count, color } = card;
        return [shape, fill, count, color]
      })
      .reduce((acc, card)  => acc.map((attr, i) => attr + card[i])) // summation
      .every(total => total % 3 === 0); // Check if evenly divisible


  }
}

export default SetCard;