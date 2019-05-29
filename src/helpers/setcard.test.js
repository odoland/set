import SetCard from './setcard';
import { exportAllDeclaration } from '@babel/types';

// random card
it("generates a random card", function() {
  let usedSet = new Set();
  let card = SetCard.generateRandomCard(usedSet);
  expect(Object.keys(card)).toHaveLength(5);
  expect(card.id).toHaveLength(4);
  expect(typeof card.id).toBe("string");
});

// random cards
it("generates many random cards", function() {
  let usedSet = new Set();
  let cards = SetCard.generateRandomCards(5, usedSet);
  expect(cards).toHaveLength(5);
});

