const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
  // This is the new field
  itemId: [
    {
      _id: {
        type: ObjectId,
        ref: "Item",
        required: true,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  memberId: {
    type: ObjectId,
    ref: "Member",
  },
  bankId: {
    type: ObjectId,
    ref: "Bank",
  },
  payments: {
    // This is the new field
    proofPayment: {
      type: String,
    },
    bankFrom: {
      type: String,
    },
    status: {
      type: String,
      default: "Proccessing",
    },
    accountHolder: {
      type: String,
    },
  },
  status: {
    type: String,
    default: "Proccessing",
  },
});

module.exports = mongoose.model("Order", orderSchema);
