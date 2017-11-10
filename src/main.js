const Blockchain = require('./blockchain');
const Block = require('./block');

let jamesCoin = new Blockchain();
console.log('Mining block 1...');
jamesCoin.addBlock(new Block(1, { amount: 4 }));

console.log('Mining block 2...');
jamesCoin.addBlock(new Block(2, { amount: 8 }));

console.log('Current JamesCoin blockchain is . . .');
console.log(JSON.stringify(jamesCoin, null, '  '));

console.log("JamesCoin is currently " + (jamesCoin.isChainValid() ? "valid" : "not valid"));