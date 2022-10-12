const Block = require("./blockchain/block.js");

const block = new Block("100", "75667887sadsad", "3749362798asdasd", "100");
console.log(block.toString());
console.log(Block.genesis().toString());
const primeiroBloco = Block.mineBlock(Block.genesis(), "500");
console.log(primeiroBloco.toString());
