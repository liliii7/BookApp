const Editorials = require("../models/editorials");
const Books = require("../models/books");

exports.getEditorialList = async (req, res, next) => {
  try {
    const editorials = await Editorials.findAll();

    const editorialsWithBookCount = await Promise.all(
        editorials.map(async (editorial) => {
        const bookCount = await Books.count({
          where: { editorialId: editorial.editorialId },
        });
        return {
          ...editorial.dataValues,
          bookCount,
        };
      })
    );
    res.render("editorials/editorials-page", {
      pageTitle: "Editorials",
      edt: editorialsWithBookCount,
      hasEditorials: editorialsWithBookCount.length > 0,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAddEditorial = (req, res, next) => {
    Editorials.findAll()
      .then((result) => {
        const editorials = result.map((result) => result.dataValues);
        res.render("editorials/save-editorials", {
          pageTitle: "Add editorial",
          categories: editorials,
          editMode: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.postAddEditorial = (req, res, next) => {
    const name = req.body.EditorialName;
    const phone = req.body.Phone;
    const country = req.body.Country;
    Editorials.create({
      editorialName: name,
      phone: phone,
      country: country,
    })
      .then((result) => {
        return res.redirect("/bookshop/editorials-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.getEditEditorial = (req, res, next) => {
    const id = req.params.editorialId;
    Editorials.findOne({ where: { editorialId: id } })
      .then((result) => {
        if (!result) {
          return res.redirect("/bookshop/editorials-page");
        }
        const editorial = result.dataValues;
        res.render("editorials/save-editorials", {
          pageTitle: "Category Edition",
          editorial: editorial,
          editMode: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.postEditEditorial = (req, res, next) => {
    const id = req.body.EditorialId;
    const nameEd = req.body.EditorialName;
    const phone = req.body.Phone;
    const country = req.body.Country;
    Editorials.update(
      {
        editorialName: nameEd,
        phone: phone,
        country: country,
      },
      { where: { editorialId: id } }
    )
      .then((result) => {
        return res.redirect("/bookshop/editorials-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.postDeleteEditorial = (req, res, next) => {
    const id = req.body.EditorialId;
  
    Editorials.destroy({ where: { editorialId: id } })
      .then((result) => {
        return res.redirect("/bookshop/editorials-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };