const express = require("express");
const router = express.Router();
const editorialCtr = require("../controllers/editorialsController");

router.get("/editorials-page", editorialCtr.getEditorialList);

router.get("/add-editorial", editorialCtr.getAddEditorial);
router.post("/add-editorial", editorialCtr.postAddEditorial);

router.post("/delete-editorial", editorialCtr.postDeleteEditorial);

router.get("/edit-editorial/:editorialId", editorialCtr.getEditEditorial);
router.post("/edit-editorial", editorialCtr.postAddEditorial);

module.exports = router;
