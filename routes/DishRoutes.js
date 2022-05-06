const express = require('express');
const router = express.Router();
const controller = require('../controllers/DishControllers.js');
const { login } = require('../auth/auth')
const { verify } = require('../auth/auth');
const { render, get } = require('express/lib/response');

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get("/", controller.landing_page);
router.get('/new', verify, controller.show_new_entries);
router.post('/new', verify, controller.post_new_entry);
router.get('/posts/:author', controller.show_user_entries);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get("/loggedIn", verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);


//Static pages
router.get('/about', controller.About_page);
router.get('/gallery', controller.Gallery_page);

//menu page
router.get('/menu', controller.DisplayMenu);


//re direct to error page
router.use(function (req, res) {
    res.status(404);

    res.render("sections/NoPage", {
        title: "Error 404 - Page Not Found"
    });
});

router.use(function (err, req, res, next) {
    res.status(500);
    // res.type('text/plain');
    //res.send('Internal Server Error.');
    res.render("sections/ServerError", {
        title: "Error 500 - Internal Server Error"
    });
});
module.exports = router;