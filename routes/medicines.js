const express = require('express');
const router = express.Router();
const passport = require('passport');

const medicinesController = require('../controllers/medicines_controller');

router.get('/', passport.checkAuthentication, medicinesController.view);
router.post('/create', medicinesController.create);
router.get('/delete', medicinesController.delete);
module.exports = router;