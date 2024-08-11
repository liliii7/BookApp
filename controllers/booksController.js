const Books = require("../models/books");
const Categories = require("../models/categories");
const Authors = require("../models/authors");
const Editorials = require("../models/editorials");
const transporter = require("../services/emailServices");

exports.GetBookList = (req, res, next) => {
  Books.findAll({
    include: [{ model: Categories }, { model: Authors }, { model: Editorials }],
  })
    .then((result) => {
      const books = result.map((result) => result.dataValues);

      res.render("books/books-page", {
        pageTitle: "Books",
        bks: books,
        hasBooks: books.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetAddBook = (req, res, next) => {
  const categoriesPromise = Categories.findAll();
  const authorsPromise = Authors.findAll();
  const editorialsPromise = Editorials.findAll();

  Promise.all([categoriesPromise, authorsPromise, editorialsPromise])
    .then(([categoryResult, authorResult, editorialResult]) => {
      const categories = categoryResult.map(
        (categoryResult) => categoryResult.dataValues
      );
      const authors = authorResult.map(
        (authorResult) => authorResult.dataValues
      );
      const editorials = editorialResult.map(
        (editorialResult) => editorialResult.dataValues
      );

      res.render("books/save-books", {
        pageTitle: "Add Book",
        categories: categories,
        authors: authors,
        editorials: editorials,
        editMode: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditBook = (req, res, next) => {
  const id = req.params.bookId;
  const categoriesPromise = Categories.findAll();
  const authorsPromise = Authors.findAll();
  const editorialsPromise = Editorials.findAll();
  const bookPromise = Books.findOne({
    where: { bookId: id },
    include: [Categories, Authors, Editorials],
  });

  Promise.all([
    categoriesPromise,
    authorsPromise,
    editorialsPromise,
    bookPromise,
  ])
    .then(([categoryResult, authorResult, editorialResult, bookResult]) => {
      const book = bookResult.dataValues;

      const categories = categoryResult.map((cat) => cat.dataValues);
      const authors = authorResult.map((aut) => aut.dataValues);
      const editorials = editorialResult.map((edit) => edit.dataValues);

      res.render("books/save-books", {
        pageTitle: "edit Book",
        book: book,
        categories: categories,
        authors: authors,
        editorials: editorials,
        editMode: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostAddBook = async (req, res, next) => {
  const name = req.body.BookName;
  const year = req.body.BookYear;
  const image = req.file;
  const catId = req.body.Category;
  const autId = req.body.Author;
  const editId = req.body.Editorial;

  try {
    const author = await Authors.findOne({ where: { authorId: autId } });

    const email = author.dataValues.email;
    console.log("Este es el email: " + email);

    const book = await Books.create({
      bookName: name,
      year: year,
      imagePath: "/" + image.path,
      categoryId: catId,
      authorId: autId,
      editorialId: editId,
    });

    await transporter.sendMail({
      from: "BookShop Alert!",
      to: email,
      subject: "Se ha creado un nuevo libro con su auditoría",
      html: `El libro creado se llama <strong> ${name} </strong>`,
    });

    res.redirect("/bookshop/books-page");
  } catch (err) {
    console.log(err);
  }
};

exports.postDeleteBook = (req, res, next) => {
  const id = req.body.BookId;

  Books.destroy({ where: { bookId: id } })
    .then((result) => {
      return res.redirect("/bookshop/books-page");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditBook = (req, res, next) => {
  const id = req.body.BookId;
  const name = req.body.BookName;
  const year = req.body.BookYear;
  const image = req.file;
  const catId = req.body.Category;
  const autId = req.body.Author;
  const editId = req.body.Editorial;

  Books.findOne({ where: { bookId: id } })
    .then((result) => {
      const book = result.dataValues;

      if (!book) {
        alert("no hay libro con ese id");
        return res.redirect("/bookshop/books-page");
      }

      const imgPath = image ? "/" + image.path : book.imagePath;

      Books.update(
        {
          bookName: name,
          year: year,
          imagePath: imgPath,
          categoryId: catId,
          authorId: autId,
          editorialId: editId,
        },
        { where: { bookId: id } }
      )
        .then((result) => {
          return res.redirect("/bookshop/books-page");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
