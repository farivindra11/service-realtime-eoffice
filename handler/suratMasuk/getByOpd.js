const apiAdapter = require('../../_helpers/apiAdapter');
const { API_GATEWAY_EOFFICE } = process.env;

const api = apiAdapter(API_GATEWAY_EOFFICE);

const suratMasuk = async (req, res) => {

    try {
        const kodeopd = req.query.kodeopd
        const token = req.headers.authorization

        const data = await api.get(`/surat-masuk?kodeopd=${kodeopd}`, {
            headers: {
                Authorization: token || ''
            }
        });
        if (data.data.status === false) {
            res.status(data.data.status_code).json(data.data)
        } else {
            io.emit('suratMasuk', data.data)
            res.status(200).json(data.data)
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
}

module.exports = {
    suratMasuk
}