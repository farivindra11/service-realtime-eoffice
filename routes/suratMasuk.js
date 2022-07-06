const express = require("express");
const router = express.Router();
const suratMasukHandler = require('../handler/suratMasuk/getByOpd')

router.get('/', suratMasukHandler.suratMasuk)

module.exports = router;