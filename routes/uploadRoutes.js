const upload = require('../middleware/multr');
const { uploadFile } = require('../controllers/uploadController');
const express = require('express');

const router = express.Router();

router.post('/', upload.single('image'), uploadFile);

module.exports = router;