// request da API do Pipedrive
const axios = require('axios');



async function getDeals() {
  try {
    const dealUrl = 'https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=4750e1f9d9183fe5e94a0e1925dbf59d2d0a6646';
    const response = await axios.get(dealUrl);
    return response;
  } catch (error) {
    console.error(error);
  }
}
async function getProductsOfDeal(idsArray) {
  try {
    let result = await idsArray.map(async el => {
      return axios.get(`https://api.pipedrive.com/v1/deals/${el}/products?start=0&api_token=4750e1f9d9183fe5e94a0e1925dbf59d2d0a6646`)
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}
module.exports.getDeals = getDeals;
module.exports.getProductsOfDeal = getProductsOfDeal;
