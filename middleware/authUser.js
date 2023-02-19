const Users = require("../models/Users");

const verifyUser = async (req, res, next) => {
  if (!req.session.user) {
    res.status(401).json({ message: "Unauthorized" });
  }
  const user = await Users.findOne({ _id: req.session.user._id });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  req.user = user._id;

  next();
};

module.exports = { verifyUser };
