const Transaction = require("./transaction");
const Wallet = require("./index");

describe("Transaction", () => {
  let transaction, wallet, recipient, amount;
  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = "dSINo1dIsdYqU3uwG23dH";
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it("outputs the `amount` subtracted from the wallet balance", () => {
    expect(
      transaction.outputs.find((output) => output.address == wallet.publicKey)
        .amount
    ).toEqual(wallet.balance - amount);
  });

  it("outputs `amount` added to the recipient", () => {
    expect(
      transaction.outputs.find((output) => output.address == recipient).amount
    ).toEqual(amount);
  });

  describe("transaction that exceeds the balance", () => {
    beforeEach(() => {
      amount = 500000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it("does not create the transaction", () => {
      expect(transaction).toEqual(undefined);
    });
  });
});
