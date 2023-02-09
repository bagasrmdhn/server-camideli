const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    default: "0",
  },
  bankName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bank", bankSchema);
