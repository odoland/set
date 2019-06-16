
class SetCards {


  /** Randomly draws a  single random set card.
   * Each attr: (shape, fill, count, color) is an int from 0 - 2 (inclusive)
   * @param {Set} usedSet - Set of id's of cards already drawn
   */
  static generateRandomCard(usedSet) {

    let randomNums;
    let shape, fill, count, color;
    let id;
    do { // Randomly generate a card
      randomNums = Array.from({ length: 4 }, () => ~~(Math.random() * 3));
      [shape, fill, count, color] = randomNums;
      id = `${shape}${fill}${count}${color}`;
    } while (usedSet.has(id));

    // Prevent duplicates
    const setCard = { shape, fill, count, color, id};
    usedSet.add(setCard.id);
    return setCard;
  }

  /** Randomly draws an array of unique set cards. 
   * @param {number} amount - number of cards to draw
   * @param {Set} usedSet - Set of id's of cards already drawn
  */
  static generateRandomCards(amount, usedSet=new Set()) {
    return Array.from({ length: amount }, () => this.generateRandomCard(usedSet));
  }

  /**
   * Gets the parameters for canvas.drawImage based on the shape, fill count and color
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
        destinations = [95, 155];
        break;
      case 2:
        destinations = [70, 125, 180];
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
    // Destinations is a list of three parameters
    return { params1, destinations, params2 };
  }

  /**
   * Determines whether an array of 3 cards is a set. Returns true/false
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

export default SetCards;