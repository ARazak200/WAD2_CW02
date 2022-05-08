const express = require('express');
const router = express.Router();
const controller = require('../controllers/DishControllers.js');
const { login } = require('../auth/auth')
const { verify } = require('../auth/auth');
const { render, get } = require('express/lib/response');

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
//router.get("/", controller.landing_page);
router.get("/", controller.homePage);

//Staff area
router.get('/staff', verify, controller.handle_login);

router.get('/new', verify, controller.show_new_entries);
router.post('/new', verify, controller.post_new_entry);

router.get('/delete', verify, controller.show_delete_dish);
//router.post('/delete_post', controller.post_delete_dish);
router.get('/edit', verify, controller.show_edit_dish);
//router.post('/edit_post', controller.post_edit_dish);

router.get("/loggedIn", verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);

//Static pages
router.get('/about', controller.About_page);
router.get('/gallery', controller.Gallery_page);

//menu page
router.get('/menu', controller.DisplayMenu);

router.get('/posts/:author', controller.show_user_entries);
//router.get('/register', controller.show_register_page);
//router.post('/register', controller.post_new_user);

//re direct to error page
router.use(function (req, res) {
    res.status(404);
    res.render("sections/NoPage", {
        title: "Error 404 - Page Not Found"
    });
});

router.use(function (err, req, res, next) {
    res.status(500);
    res.render("sections/ServerError", {
        title: "Error 500 - Internal Server Error"
    });
});

module.exports = router;