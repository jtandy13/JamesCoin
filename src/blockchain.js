//sha256 (Secure Hash Algorithm) was created by the NSA
const SHA256 = require("crypto-js/sha256");
const Block = require('./block');

class Blockchain {
  constructor() {
    //Creates an array with one block - the genesis block
    this.chain = [this.createGenesisBlock()];
    /**
     * 'difficulty' is the amount of "0"s that need to appear at the beginning
     * of a block's hash in order to meet the proof of work
     */
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      /**
       * Is the current block's hash equal the the hash of the block contents?
       * If not, the block has been tampered with.
       */
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;