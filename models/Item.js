const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sumOrder: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
  },

  categoryId: [
    {
      type: ObjectId,
      ref: "Category",
    },
  ],
  imageId: [
    {
      type: ObjectId,
      ref: "Image",
    },
  ],
});

module.exports = mongoose.model("Item", itemSchema);
