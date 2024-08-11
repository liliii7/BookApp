const Categories = require("../models/categories");
const Books = require("../models/books");

exports.getCategoriesList = async (req, res, next) => {
  try {
    const categories = await Categories.findAll();

    const catWithBookCount = await Promise.all(
      categories.map(async (category) => {
        const bookCount = await Books.count({
          where: { categoryId: category.categoryId },
        });
        return {
          ...category.dataValues,
          bookCount,
        };
      })
    );
    res.render("categories/categories-page", {
      pageTitle: "Categories",
      cat: catWithBookCount,
      hasCategories: catWithBookCount.length > 0,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAddCategory = (req, res, next) => {
  Categories.findAll()
    .then((result) => {
      const categories = result.map((result) => result.dataValues);
      res.render("categories/save-categories", {
        pageTitle: "Add category",
        categories: categories,
        editMode: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddCategory = (req, res, next) => {
  const name = req.body.CategoryName;
  const description = req.body.Description;
  Categories.create({
    categoryName: name,
    description: description,
  })
    .then((result) => {
      return res.redirect("/bookshop/categories-page");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditCategory = (req, res, next) => {
  const id = req.params.categoryId;
  Categories.findOne({ where: { categoryId: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/bookshop/categories-page");
      }
      const category = result.dataValues;
      res.render("categories/save-categories", {
        pageTitle: "Category Edition",
        category: category,
        editMode: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditCategory = (req, res, next) => {
  const id = req.body.CategoryId;
  const nameCat = req.body.CategoryName;
  const desc = req.body.Description;
  Categories.update(
    {
      categoryName: nameCat,
      description: desc,
    },
    { where: { categoryId: id } }
  )
    .then((result) => {
      return res.redirect("/bookshop/categories-page");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteCategory = (req, res, next) => {
  const id = req.body.CategoryId;

  Categories.destroy({ where: { categoryId: id } })
    .then((result) => {
      return res.redirect("/bookshop/categories-page");
    })
    .catch((err) => {
      console.log(err);
    });
};
