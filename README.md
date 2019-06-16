# Set
This project accompanies my other project, [Roboset](https://github.com/odoland/roboset).

This repository is an implementation of the card game [Set](https://en.wikipedia.org/wiki/Set_(card_game) with React and Redux.

## Rules of the Game
The goal of this game is to find a *set* .
Each card in this game has four attributes:
- **count**:  `1`, `2`, or `3`.
- **color** : `red`, `purple`, `green`
- **fill**: `striped`, `hollow`, `filled`
- **shape**: `diamond`, `striped`, `hollow`

A set consists of three cards that satisfy all these categories:

- They all have the same `count` or have three different `counts`.
- They all have the same `color` or have three different `colors`.
- They all have the same `shading` or have three different `shadings`.
- They all have the same `shape` or have three different `shapes`.

## Running app for developers/or to play on localhost:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.