const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");
const connection = require("./context/appContext");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

app.use(multer({ storage: imgStorage }).single("Image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "home-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "assets")));

const bookShopRoute = require("./routes/bookshop");
const bookRoute = require("./routes/booksRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const editorialsRoute = require("./routes/editorialsRoute");
const authorsRoute = require("./routes/authorsRoute");

app.use("/bookshop", bookShopRoute);
app.use("/bookshop", bookRoute);
app.use("/bookshop", categoriesRoute);
app.use("/bookshop", editorialsRoute);
app.use("/bookshop", authorsRoute);

const errorCtr = require("./controllers/errorController");

app.use("/", errorCtr.GetError);

const Books = require("./models/books");
const Categories = require("./models/categories");
const Authors = require("./models/authors");
const Editorials = require("./models/editorials");

Books.belongsTo(Categories, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "categoryId",
    allowNull: false,
  },
});

Books.belongsTo(Authors, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});

Books.belongsTo(Editorials, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "editorialId",
    allowNull: false,
  },
});

Categories.hasMany(Books, {
  onDelete: "CASCADE",
  hooks: true,
  foreignKey: "categoryId",
});

Editorials.hasMany(Books, {
  onDelete: "CASCADE",
  hooks: true,
  foreignKey: "editorialId",
});

Authors.hasMany(Books, {
  onDelete: "CASCADE",
  hooks: true,
  foreignKey: "authorId",
});

connection
  .sync()
  .then(() => {
    app.listen(3005, () => {
      console.log("Server is running on port 3005");
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
