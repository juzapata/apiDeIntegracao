// request da API do Pipedrive
const axios = require('axios');

const url = 'https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=4750e1f9d9183fe5e94a0e1925dbf59d2d0a6646';
  
async function getDeals() {
    try {
      const response = await axios.get(url);
      console.log(response.data.data[0]);
      return response;
    } catch (error) {
      console.error(error);
    }
  }







// async function getDeals() {
//     try {
//       const response = await axios.get(url, 
//         {headers: {
//             "Accept": "application/json"
//         }});
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }
  module.exports.getDeals = getDeals;

//   axios.get('https://example.com/getSomething', {
//     headers: {
//       Authorization: 'Bearer ' + token //the token is a variable which holds the token
//     }
//    })

// // get
// let options = {
//     url: url,
//     json: true
// };