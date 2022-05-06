const DishDAO = require("../models/DishModel");
const userDao = require("../models/userModel.js");

const db = new DishDAO();
//db.init();
db.Dishes_insert();

exports.show_login = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
  // res.redirect("/new");
  //staff page - CHANGE
  res.render("newEntry", {
    title: "new Entry",
    user: "user"
  });
};

exports.homePage = function (req, res) {
  res.render("landing", {
    title: "Home Page"
  });
}

//Showing static pages to user
exports.About_page = function (req, res) {
  res.render("about", {
    title: "About"
  });
}

exports.Gallery_page = function (req, res) {
  res.render("gallery", {
    title: "Gallery"
  });
}
exports.DisplayMenu = function (req, res) {
  db.getAllDishes()
    .then((DishList) => {
      res.render("menu", {
        title: "Menu",
        dishes: DishList,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });

  /*
    db.getAllEntries()
      .then((list) => {
        res.render("menu", {
          title: "Menu",
          entries: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
  */
}

exports.Error = function (req, res) {
  res.render("sections/err", {
    title: "Error"
  });
}

//landing page - home page- NOT IN USE
exports.landing_page = function (req, res) {

  db.getAllEntries()
    .then((list) => {
      res.render("landing", {
        title: "Home",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "add new Dish",
    user: "user",
  });
};

//post new entry - change to menu item
exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
  }
  db.addEntry(req.body.author, req.body.subject, req.body.contents);
  res.redirect("/loggedIn");
};

//shows user entries
exports.show_user_entries = function (req, res) {
  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("landing", {
        title: "Guest Book",
        user: "user",
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

//change to Staff page
exports.loggedIn_landing = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("landing", {
        title: "Home",
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

//log out function
exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};





/*register remove*/
exports.show_register_page = function (req, res) {
  res.render("user/register");
};

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;

  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};
