// request da API do Bling

// api key
// e6aef05d5e43181d5abbe81e9cf2defc320a3d6b39b8a31b014f445277734e9af128483b
async function sendOrder(orders){
   return await orders.map(order =>{
    const dataString = `apikey={apikey}&xml=${order}https://manuais.bling.com.br/manual/?item=situacoes`;
        let options = {
            url: 'https://bling.com.br/Api/v2/pedido/json/',
            method: 'POST',
            body: dataString
        };

   })

}


// <?xml version="1.0" encoding="UTF-8"?>
// <pedido>
//   <cliente>
//     <nome>String</nome>
//  </cliente>
//  <transporte>
// <volumes>
//       <volume>
//         <servico>String</servico>
//    </volume>
// </volumes>
// </transporte>
// <itens>
//    <item>
//      <descricao>String</descricao>
//     <qtde>Decimal</qtde>
//    <vlr_unit>Decimal</vlr_unit>
//   </item>
// </itens>
// <parcelas>
//    <parcela>
//        <vlr>decimal</vlr>
//    </parcela>
// </parcelas>
// </pedido>