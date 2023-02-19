const Category = require("../models/Category");
const Item = require("../models/Item");
const Bank = require("../models/Bank");
const Member = require("../models/Member");
const Order = require("../models/Order");
  landingPage: async (req, res) => {
    try {
      const item = await Item.find()
        .select("_id name price imageId categoryId")
        .populate({ path: "categoryId", select: "_id name" })
        .populate({
          path: "imageId",
          select: "_id imageUrl",
        })
        .sort({ _id: -1 });
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
        items,
        total,
        orderDate,
        firstName,
        lastName,
        email,
        phoneNumber,
        accountHolder,
        bankFrom,
        bankTo,
        address,
        city,
      } = req.body;
      console.log(req.body);
      if (!req.file) {
        return res.status(404).json({ message: "Image not found" });
      }
      if (
        !items ||
        !Array.isArray(items) ||
        items.length === 0 ||
        orderDate === undefined ||
        firstName === undefined ||
        lastName === undefined ||
        email === undefined ||
        phoneNumber === undefined ||
        accountHolder === undefined ||
        bankFrom === undefined ||
        bankTo === undefined ||
        address === undefined ||
        city === undefined ||
        total === undefined
      ) {
        return res.status(404).json({
          message: `${items}  ${orderDate} ${firstName} ${lastName} ${email} ${phoneNumber} ${accountHolder} ${bankFrom} ${bankTo} ${address} ${city} ${total}`,
        });
      }

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
        items: items.map((item) => ({
          _id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity),
          totalPrice: parseFloat(item.totalPrice),
        })),
        total,
        memberId: member.id,
        payments: {
          proofPayment: `images/${req.file.filename}`,
          bankFrom: bankFrom,
          accountHolder: accountHolder,
          bankTo: bankTo,
        },
      };
      const order = await Order.create(newOrder);
      console.log(order);

      console.log(total);
      console.log(invoice);
      res.status(200).json({ message: "Success Order", order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
