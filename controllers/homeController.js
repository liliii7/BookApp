const Books = require("../models/books");
const Categories = require("../models/categories");
const Authors = require("../models/authors");
const Editorials = require("../models/editorials");
const { Op, where } = require("sequelize");

exports.GetHome = async (req, res, next) => {
  try {
    const booksResult = await Books.findAll({
      include: [{ model: Categories }, { model: Authors }, { model: Editorials }],
    });

    const categoriesResult = await Categories.findAll();

    const books = booksResult.map((result) => result.dataValues);
    const categories = categoriesResult.map((cat) => cat.dataValues);

    res.render("home/bookshop", {
      pageTitle: "Books",
      bks: books,
      categories: categories,
      hasBooks: books.length > 0,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.GetBookDetails = (req, res, next) => {
  const id = req.params.bookId;

  Books.findOne({
    where: { bookId: id },
    include: [{ model: Categories }, { model: Authors }, { model: Editorials }],
  })
    .then((result) => {
      if (!result) {
        return res.render("home/book-details", {
          pageTitle: "Book not Found",
          book: null,
          hasBooks: false,
        });
      }
      const book = result.dataValues;
      res.render("home/book-details", {
        pageTitle: "Book Details",
        book: book,
        hasBooks: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFindBookByName = async (req, res, next) => {
  try {
    const searchValue = req.query.SearchValue.toLowerCase();

    const categories = await Categories.findAll();

    const books = await Books.findAll({
      where: {
        bookName: {
          [Op.like]: `%${searchValue}%`,
        },
      },
    });

    res.render("home/bookshop", {
      pageTitle: "Books",
      bks: books.map((book) => book.dataValues),
      categories: categories.map((cat) => cat.dataValues),
      hasBooks: books.length > 0,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getFindBookByCategory = async (req, res, next) => {
  try {
    const categoryIds = [].concat(req.query.CategoryId).map(Number);

    const categories = await Categories.findAll();

    let bookFilter = {};
    if (categoryIds.length > 0) {
      bookFilter.categoryId = {
        [Op.in]: categoryIds,
      };
    }

    const books = await Books.findAll({
      where: bookFilter,
    });

    res.render("home/bookshop", {
      pageTitle: "Books",
      bks: books.map((book) => book.dataValues),
      categories: categories.map((cat) => cat.dataValues),
      hasBooks: books.length > 0,
      selectedCategories: categoryIds,
    });
  } catch (err) {
    console.log(err);
  }
};
