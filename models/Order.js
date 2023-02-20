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
  City: {
    type: String,
  },

  address: {
    type: String,
  },

  // This is the new field
  items: [
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
      },
      quantity: {
        type: Number,
      },
      totalPrice: {
        type: Number,
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
  userId: {
    type: ObjectId,
    ref: "Users",
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
    bankTo: {
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
