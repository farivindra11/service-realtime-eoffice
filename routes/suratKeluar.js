const express = require("express");
const router = express.Router();
const suratKeluarHandler = require('../handler/suratKeluar')

router.get('/', suratKeluarHandler.getAll)
module.exports = router;