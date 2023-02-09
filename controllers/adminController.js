const Category = require("../models/Category");
const Item = require("../models/Item");
const Image = require("../models/Image");
const Bank = require("../models/Bank");
const Users = require("../models/Users");
const Order = require("../models/Order");
const Member = require("../models/Member");
const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcryptjs");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          alert,
          title: "Camideli | Login",
        });
      } else {
        return res.redirect("/admin/dashboard");
      }
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username: username });
      // console.log(user);
      if (user == null) {
        req.flash("alertMessage", "User not found");
        req.flash("alertStatus", "danger");
        return res.redirect("/admin/signin");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "Username / Password not match");
        req.flash("alertStatus", "danger");
        return res.redirect("/admin/signin");
      }
      req.session.user = {
        id: user.id,
        username: user.username,
      };

      res.redirect("/admin/dashboard");
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },

  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect("/admin/signin");
  },

  viewDashboard: async (req, res) => {
    try {
      const member = await Member.find();

      res.render("admin/dashboard/view_dashboard", {
        title: "Camideli | Dashboard",
        user: req.session.user,
        member,
      });
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  },
  viewItem: async (req, res) => {
    try {
      const item = await Item.find()
        .populate({ path: "imageId", select: "id imageUrl" })
        .populate({ path: "categoryId", select: "id name" });
      // console.log(item);
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/item/view_item", {
        title: "Camideli | Item",
        alert,
        category,
        item,
        user: req.session.user,
        action: "view",
      });
    } catch (error) {
      res.redirect("/admin/item");
    }
  },

  showImageItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id }).populate({
        path: "imageId",
        select: "id imageUrl",
      });

      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/item/view_item", {
        title: "Camideli | Show Image Item",
        alert,
        category,
        item,
        user: req.session.user,
        action: "show image",
      });
    } catch (error) {
      res.redirect("/admin/item");
    }
  },

  showEditItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id })
        .populate({
          path: "imageId",
          select: "id imageUrl",
        })
        .populate({
          path: "categoryId",
          select: "id name",
        });
      // console.log(item);
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/item/view_item", {
        title: "Camideli | Show Edit Item",
        alert,
        category,
        item,
        user: req.session.user,
        action: "edit",
      });
    } catch (error) {
      res.redirect("/admin/item");
    }
  },

  addItem: async (req, res) => {
    try {
      const {
        categoryId,
        item_name,
        item_price,
        item_stock,
        item_status,
        about,
      } = req.body;
      if (req.files.length > 0) {
        const category = await Category.findOne({ _id: categoryId });
        const newItem = {
          categoryId: category._id,
          name: item_name,
          price: item_price,
          stock: item_stock,
          status: item_status,
          description: about,
        };
        const item = await Item.create(newItem);
        category.ItemId.push({ _id: item._id });
        await category.save();
        for (let i = 0; i < req.files.length; i++) {
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[i].filename}`,
          });
          item.imageId.push({ _id: imageSave._id });
          await item.save();
        }

        req.flash("alertMessage", "Success Add Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/item");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },

  editItem: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        categoryId,
        item_name,
        item_price,
        item_stock,
        item_status,
        about,
      } = req.body;
      const item = await Item.findOne({ _id: id })
        .populate({ path: "imageId", select: "id imageUrl" })
        .populate({ path: "categoryId", select: "id name" });
      if (req.files.length > 0) {
        for (let i = 0; i < item.imageId.length; i++) {
          const imageUpdate = await Image.findOne({ _id: item.imageId[i]._id });
          await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
          imageUpdate.imageUrl = `images/${req.files[i].filename}`;
          await imageUpdate.save();
          // console.log(req.files[i].filename);
          req.flash("alertMessage", "Success Update Item");
          req.flash("alertStatus", "success");
          return res.redirect("/admin/item");
        }
      } else {
        item.categoryId = categoryId;
        item.name = item_name;
        item.price = item_price;
        item.stock = item_stock;
        item.status = item_status;
        item.description = about;
        await item.save();
        req.flash("alertMessage", "Success Update Item");
        req.flash("alertStatus", "success");
        return res.redirect("/admin/item");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },

  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id }).populate("imageId");
      for (let i = 0; i < item.imageId[i].length; i++) {
        Image.findOne({ _id: item.imageId[i]._id }).then((Image) => {
          fs.unlink(path.join(`public/${Image.imageUrl}`));
          Image.remove();
        });
        // console.log(item.imageId[i]._id);
      }
      await item.remove();
      req.flash("alertMessage", "Success Delete Item");
      req.flash("alertStatus", "success");
      res.redirect("/admin/item");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },

  viewCategory: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      // console.log(category);
      res.render("admin/category/view_category", {
        category,
        alert,
        user: req.session.user,
        title: "Camideli | Category",
      });
    } catch (error) {
      res.redirect("/admin/category");
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      // console.log(name);
      await Category.create({ name });
      req.flash("alertMessage", "Success Add Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");

      res.redirect("/admin/category");
    }
  },

  editCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      req.flash("alertMessage", "Success Update Category");
      req.flash("alertStatus", "success");
      category.name = name;
      await category.save();

      // await category.save();
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      req.flash("alertMessage", "Success Delete Category");
      req.flash("alertStatus", "success");
      await category.remove();
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  viewBank: async (req, res) => {
    try {
      const bank = await Bank.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/bank/view_bank", {
        title: "Camideli | Bank",
        alert,
        user: req.session.user,
        bank,
      });
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  addBank: async (req, res) => {
    try {
      const { name, accountNumber, bankName } = req.body;
      await Bank.create({
        name,
        accountNumber,
        bankName,
      });
      req.flash("alertMessage", "Success Add Bank");
      req.flash("alertStatus", "success");

      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  editBank: async (req, res) => {
    try {
      const { id, name, accountNumber, bankName } = req.body;
      const bank = await Bank.findOne({ _id: id });
      req.flash("alertMessage", "Success Update Category");
      req.flash("alertStatus", "success");
      bank.name = name;
      bank.accountNumber = accountNumber;
      bank.bankName = bankName;
      await bank.save();

      // await category.save();
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });
      req.flash("alertMessage", "Success Delete Bank");
      req.flash("alertStatus", "success");
      await bank.remove();
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `error.message`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  viewOrder: async (req, res) => {
    try {
      const order = await Order.find().populate("memberId").populate("bankId");

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/order/view_order", {
        title: "Camideli | Order",
        user: req.session.user,
        alert,
        order,
      });
    } catch (error) {
      res.redirect("/admin/order");
    }
  },

  showDetailOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findOne({ _id: id })
        .populate("memberId")
        .populate("bankId");
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/order/show_detail_order", {
        title: "Camideli | Detail Order",
        user: req.session.user,
        alert,
        order,
      });
    } catch (error) {
      res.redirect("/admin/order");
    }
  },

  actionConfirmation: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const order = await Order.findOne({ _id: id });
      order.payments.status = status;
      await order.save();
      req.flash("alertMessage", "Success Updating Payment Status");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/order/${id}`);
    } catch (error) {
      res.redirect(`/admin/order/${id}`);
    }
  },
  actionReject: async (req, res) => {
    const { id } = req.params;

    try {
      const order = Order.findOne({ _id: id });
      order.status = "Reject";
      await order.save();
      req.flash("alertMessage", "Success Confirmation");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/order/${id}`);
    } catch (error) {
      res.redirect(`/admin/order/${id}`);
    }
  },
};
