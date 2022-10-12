const Blockchain = require("./index");
const Block = require("./block");

describe("Blockchain", () => {
  let bc;
  let bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it("starts with genesis block", () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block", () => {
    const data = "arquivo.pdf";
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it("validates a valid chain", () => {
    bc2.addBlock("500");

    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it("invalidates a chain with a corrupted genesis block", () => {
    bc2.chain[0].data = "0";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("invalidates a corrupted chain", () => {
    bc2.addBlock("200");
    bc2.chain[1].data = "0";

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("Repleces the chain with a valid chain", () => {
    bc2.addBlock("600");
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it("Does not replece the chain with one of less or equal length", () => {
    bc.addBlock("400");
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  });
});
