const apiAdapter = require('../../_helpers/apiAdapter');
// const { API_GATEWAY_EOFFICE } = process.env;

const api = apiAdapter('https://siharko.magetan.go.id/api');

module.exports = async (req, res)=> {

    try {
    //   console.log('masuk sini');
    //   const kodeopd = req.query.kodeopd
    //   console.log(kodeopd, 'asdfa');
    console.log('tes');

        const data = await api.get(`/harga-konsumen/publik/komoditas/populer`);
       return res.json({data:data});
    } catch (error) {
        console.log(error);
    }
}