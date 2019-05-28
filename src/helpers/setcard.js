import uuid from 'uuid/v4';

class SetCard {

  /** Randomly generates a random set card.
   * Each attribute is an int from 0, 1, 2
   */
  static generateRandomCard() {
    const randomNums = Array.from({length: 4}, () => ~~(Math.random() * 3));
    const [shape, fill, count, color] = randomNums;
    return {shape, fill, count, color, id: uuid()};
  }
}

export default SetCard;