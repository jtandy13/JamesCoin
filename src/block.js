const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.UTCtimestamp = Date.now();
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    //encrypt the entire contents of the block
    return SHA256(this.index + this.previousHash + this.UTCtimestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    /**
     * The first n(determined by difficulty) characters of the hash must "0". If not,
     * add one to the nonce and hash again.
     */
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("BLOCK MINED: " + this.hash);
  }
}

module.exports = Block;