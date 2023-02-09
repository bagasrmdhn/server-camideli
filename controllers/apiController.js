const Category = require("../models/Category");
const Item = require("../models/Item");
const Bank = require("../models/Bank");
const Member = require("../models/Member");
const Order = require("../models/Order");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const item = await Item.find().select("_id name price imageId").populate({
        path: "imageId",
        limit: 1,
        select: "_id imageUrl",
      });
      const category = await Category.find().select("_id name");

      res.status(200).json({ category, item });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id })
        .populate({ path: "imageId", select: "_id imageUrl" })
        .populate({ path: "categoryId", select: "_id name" });

      const testimonial = {
        _id: "asd1293uasdads1",
        name: "Samira",
        email: "samira@gmail.com",
        content: "Nice",
      };
      res.status(200).json({ item, testimonial });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  orderPage: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        idItem,
        qty,
        orderDate,
        firstName,
        lastName,
        email,
        phoneNumber,
        accountHolder,
        bankFrom,
      } = req.body;
      if (!req.file) {
        return res.status(404).json({ message: "Image not found" });
      }
      if (
        idItem === undefined ||
        qty === undefined ||
        orderDate === undefined ||
        firstName === undefined ||
        lastName === undefined ||
        email === undefined ||
        phoneNumber === undefined ||
        accountHolder === undefined ||
        bankFrom === undefined
      ) {
        return res.status(404).json({ message: "Please complete all field" });
      }

      const item = await Item.findOne({ _id: idItem });
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      item.sumOrder += 1;
      await item.save();
      console.log(item);

      let total = item.price * qty;
      let tax = total * 0.1;
      const invoice = Math.floor(1000000 + Math.random() * 9000000);

      const member = await Member.create({
        firstName,
        lastName,
        email,
        phoneNumber,
      });

      const newOrder = {
        orderDate,
        invoice,
        itemId: [
          {
            _id: item.id,
            name: item.name,
            price: item.price,
            quantity: qty,
          },
        ],
        total: (total += tax),
        memberId: member.id,
        payments: {
          proofPayment: `images/${req.file.filename}`,
          bankFrom: bankFrom,
          accountHolder: accountHolder,
        },
      };
      const order = await Order.create(newOrder);
      console.log(order);

      console.log(total);
      console.log(tax);
      console.log(invoice);
      res.status(200).json({ message: "Success Order", order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
