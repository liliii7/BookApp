const Authors = require("../models/authors");
const Books = require("../models/books");

exports.getAuthorsList = async (req, res, next) => {
  try {
    const authors = await Authors.findAll();

    const authorsWithBookCount = await Promise.all(
        authors.map(async (author) => {
        const bookCount = await Books.count({
          where: { authorId: author.authorId },
        });
        return {
          ...author.dataValues,
          bookCount,
        };
      })
    );
    res.render("authors/authors-page", {
      pageTitle: "Author",
      aut: authorsWithBookCount,
      hasAuthors: authorsWithBookCount.length > 0,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAddAuthor = (req, res, next) => {
    Authors.findAll()
      .then((result) => {
        const authors = result.map((result) => result.dataValues);
        res.render("authors/save-authors", {
          pageTitle: "Add author",
          categories: authors,
          editMode: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.postAddAuthor = (req, res, next) => {
    const name = req.body.AuthorName;
    const email = req.body.Email;
    Authors.create({
      authorName: name,
      email: email,
    })
      .then((result) => {
        return res.redirect("/bookshop/authors-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.getEditAuthor = (req, res, next) => {
    const id = req.params.authorId;
    Authors.findOne({ where: { authorId: id } })
      .then((result) => {
        if (!result) {
          return res.redirect("/bookshop/authors-page");
        }
        const author = result.dataValues;
        res.render("authors/save-authors", {
          pageTitle: "Author Edition",
          author: author,
          editMode: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.postEditAuthor = (req, res, next) => {
    const id = req.body.AuthorId;
    const nameAut = req.body.AuthorName;
    const email = req.body.Email;
    Authors.update(
      {
        authorName: nameAut,
        email: email,
      },
      { where: { authorId: id } }
    )
      .then((result) => {
        return res.redirect("/bookshop/authors-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.postDeleteAuthor = (req, res, next) => {
    const id = req.body.AuthorId;
  
    Authors.destroy({ where: { authorId: id } })
      .then((result) => {
        return res.redirect("/bookshop/authors-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };