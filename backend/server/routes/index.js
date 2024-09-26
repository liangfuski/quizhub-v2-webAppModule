var express = require('express');
var router = express.Router();
let indexControllor = require('../controllers/index')
let path = require('path')

/* POST Route for prccessing the Login Page */
router.post('/login', indexControllor.processLoginPage);

/* POST Route for prccessing the Register Page */
router.post('/register', indexControllor.processRegisterPage)

/* GET to perform User Logout */
router.get('/logout', indexControllor.performLogout)

/* GET home page. */
// router.get('/', indexControllor.epic);
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

module.exports = router;
