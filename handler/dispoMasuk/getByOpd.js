const apiAdapter = require('../../_helpers/apiAdapter');
const { API_GATEWAY_EOFFICE } = process.env;

const api = apiAdapter(API_GATEWAY_EOFFICE);

const diposisiMasuk = async (req, res) => {
    try {
        const user_id = req.query.user
        const kode_opd = req.query.kodeopd
        const token = req.headers.authorization
        
        const data = await api.get(`/disposisi-masuk?user=${user_id}&kodeopd=${kode_opd}`,  {
            headers: {
                Authorization: token || ''
            }
        })
        if (data.data.status === false) {
            res.status(data.data.status_code).json(data.data)
        } else {
            io.emit('disposisiMasuk', data.data)
            res.status(200).json(data.data)
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
     
}

module.exports = {
    diposisiMasuk
}