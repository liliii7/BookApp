const express = require("express");
const router = express.Router();
const categoryCtr = require("../controllers/categoriesController");

router.get("/categories-page", categoryCtr.getCategoriesList);

router.get("/add-category", categoryCtr.getAddCategory);
router.post("/add-category", categoryCtr.postAddCategory);

router.post("/delete-category", categoryCtr.postDeleteCategory);

router.get("/edit-category/:categoryId", categoryCtr.getEditCategory);
router.post("/edit-category", categoryCtr.postEditCategory);

module.exports = router;
