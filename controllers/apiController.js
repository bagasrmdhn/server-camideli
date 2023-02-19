const Category = require("../models/Category");
const Item = require("../models/Item");
const Bank = require("../models/Bank");
const Member = require("../models/Member");
const Order = require("../models/Order");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      // const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Users({ fullName, email, password });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Errors" });
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user with given email exists
      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Create and sign a JWT token with user ID
      const token = jwt.sign({ id: user._id }, "process.env.JWT_SECRET", {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      // // Return the token to the client
      res.status(200).json({
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
        message: "Login Success",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  getMe: async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await Users.findOne({ _id: req.session.user._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      // message: req.session.user,
    });
  },

  logOut: async (req, res) => {
    console.log(req.session);
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(200).json({ message: "Logout Success" });
    });
  },
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
          message: `Please complete the form`,
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
