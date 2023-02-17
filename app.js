var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("fs");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const MongoDBStore = require("connect-mongodb-session")(session);

//import mongoose
var mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://camideli:Bara1234@cluster0.10owyxz.mongodb.net/db_camideli?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const store = new MongoDBStore({
  uri: "mongodb+srv://camideli:Bara1234@cluster0.10owyxz.mongodb.net/db_camideli?retryWrites=true&w=majority",
  collection: "sessions",
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// router admin
var adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");
dotenv.config();
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 60 * 60 * 1000 }, // 2 hours in milliseconds},
  })
);
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// router admin
app.use("/admin", adminRouter);
app.use("/api/v1/member", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
