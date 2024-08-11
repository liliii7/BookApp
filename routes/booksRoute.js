const express = require("express");
const router = express.Router();
const bookCtr = require("../controllers/booksController");

router.get("/books-page", bookCtr.GetBookList);
router.get("/add-book", bookCtr.GetAddBook);
router.post("/add-book", bookCtr.PostAddBook);

router.get("/edit-book/:bookId", bookCtr.getEditBook);
router.post("/edit-book", bookCtr.postEditBook);

router.post("/delete-book", bookCtr.postDeleteBook);

module.exports = router;