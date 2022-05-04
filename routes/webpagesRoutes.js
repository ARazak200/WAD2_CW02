const express = require('express');
const router = express.Router();

const webPage = require('../controllers/webPagesControllers');

router.get('/', webPage.home);
router.get('/contact', webPage.contact);
router.get('/about', webPage.about);
router.get('/gallery', webPage.gallery);

router.get('/login', webPage.login);

module.exports = router;