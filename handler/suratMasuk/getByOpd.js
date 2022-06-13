const apiAdapter = require('../../_helpers/apiAdapter');
const { API_GATEWAY_EOFFICE } = process.env;

const api = apiAdapter(API_GATEWAY_EOFFICE);

module.exports = async (req, res) => {

    try {
        console.log('masuk api sini from frontend');
        const kodeopd = req.query.kodeopd
        const token = req.headers.authorization

        const data = await api.get(`/surat-masuk?kodeopd=${kodeopd}`,
            {
                headers: {
                    'Authorization': token || ''
                }
            });
        io.emit('firstEven', data.data)
        res.status(200);


    } catch (error) {
        console.log(error);
    }
}