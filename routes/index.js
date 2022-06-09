const express = require("express");
const router = express.Router();
const suratKeluar = require('./suratKeluar');

router.use('/surat-keluar', suratKeluar);


module.exports = router;
