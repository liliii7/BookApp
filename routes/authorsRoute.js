const express = require("express");
const router = express.Router();
const authorCtr = require("../controllers/authorsController");

router.get("/authors-page", authorCtr.getAuthorsList);

router.get("/add-author", authorCtr.getAddAuthor);
router.post("/add-author", authorCtr.postAddAuthor);

router.post("/delete-author", authorCtr.postDeleteAuthor);

router.get("/edit-author/:authorId", authorCtr.getEditAuthor);
router.post("/edit-author", authorCtr.postEditAuthor);

module.exports = router;
