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
    //without the nonce value, the hash will always be the same as the other values in the block do not change.
    return SHA256(this.index + this.previousHash + this.UTCtimestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    /**
     * The first n(determined by difficulty) characters of the hash must "0". If not,
     * add one to the nonce and hash again.
     */
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      /**
       * If the current hash does not have the correct number of "0"s at the start,
       * increase the nonce by 1 and try again.
       */
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("BLOCK MINED: " + this.hash);
  }
}

module.exports = Block;