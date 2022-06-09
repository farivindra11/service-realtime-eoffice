const express = require("express");
const router = express.Router();
const suratKeluar = require('./suratKeluar');
const suratMasuk = require('./suratMasuk')

router.use('/surat-keluar', suratKeluar);
router.use('/surat-masuk', suratMasuk)


module.exports = router;
