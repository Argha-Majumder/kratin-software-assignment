const express = require('express');
const router = express.Router();

const medicinesController = require('../controllers/medicines_controller');

router.get('/', medicinesController.view);

module.exports = router;