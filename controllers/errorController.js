exports.GetError =  (req, res, next) => {
    res.status(404).render("error",{pageTitle: "Not found"});
  };