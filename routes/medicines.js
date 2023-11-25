const express = require('express');
const router = express.Router();

const medicinesController = require('../controllers/medicines_controller');

router.get('/', medicinesController.view);
router.post('/create', medicinesController.create);

module.exports = router;