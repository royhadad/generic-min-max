generic-min-max
======================

This node.js module exports a generic min-max algorithm, alongside some implementations

This package comes with full typescript support!

## Usage example (ES6/Typescript):

```javascript
import minMax from "./src/minMax";
import TicTacToe from "./src/implementations/TicTacToe";

const ticTacToe = new TicTacToe();
const continuation = minMax(ticTacToe, 9);

console.log('evaluation', continuation.evaluation);
console.log('best continuation', continuation.state);
```