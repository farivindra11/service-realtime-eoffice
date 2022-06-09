const apiAdapter = require('../../_helpers/apiAdapter');
const { API_GATEWAY_EOFFICE } = process.env;

const api = apiAdapter(API_GATEWAY_EOFFICE);

module.exports = async (req, res) => {

    try {
        const kodeopd = req.query.kodeopd
        const token = req.headers.authorization

        const data = await api.get(`/surat-masuk?kodeopd=${kodeopd}`,
            {
                headers: {
                    'Authorization': token || ''
                }
            });
        res.send(data.data)

        
    } catch (error) {
        console.log(error);
    }
}