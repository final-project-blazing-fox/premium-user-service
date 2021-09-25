const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.SERVERKEY,
});

module.exports = snap;
