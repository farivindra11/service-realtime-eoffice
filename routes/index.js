const express = require("express");
const router = express.Router();
const suratKeluar = require('./suratKeluar');
const suratMasuk = require('./suratMasuk')
const dispoMasuk = require('./dispoMasuk')

router.use('/surat-keluar', suratKeluar);
router.use('/surat-masuk', suratMasuk);
router.use('/disposisi-masuk', dispoMasuk)


module.exports = router;
