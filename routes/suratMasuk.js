const express = require("express");
const router = express.Router();
const suratMasukHandler = require('../handler/suratMasuk')

router.get('/', suratMasukHandler.getAll)
module.exports = router;