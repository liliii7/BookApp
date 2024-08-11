const express = require("express");
const router = express.Router();
const homeCtr = require("../controllers/homeController");

router.get("/", homeCtr.GetHome);
router.get("/book-details/:bookId", homeCtr.GetBookDetails);
router.get("/search-by-name", homeCtr.getFindBookByName);
router.get("/search-by-category", homeCtr.getFindBookByCategory);

module.exports = router;
