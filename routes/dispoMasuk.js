const express = require("express");
const router = express.Router();
const dispoMasukHandler = require('../handler/dispoMasuk/getByOpd')


router.get('/', dispoMasukHandler.diposisiMasuk);
module.exports = router;