const axios = require('axios');

// função que monta o xml e o request para api do Bling
async function sendOrder(orders) {
    try {
        console.log('entrou na funcao');
        return await orders.map(order => {
            console.log(order);
            return axios({
                method: 'POST',
                url: 'https://bling.com.br/Api/v2/pedido/json/&apikey=04ae06fc5700ab7c749b9a93c8b532f40a0bb3cfe41682843ffef3efea703679f27d8b6e',
                data: {
                    "xml": `<?xml version="1.0" encoding="UTF-8"?>
                <pedido>
                  <cliente>
                    <id>${order.cliente.id}</id
                    <nome>${order.cliente.nome}</nome>
                 </cliente>
                 <transporte>
                <volumes>
                      <volume>
                        <servico>${order.transporte.volumes.volume.servico}</servico>
                   </volume>
                </volumes>
                </transporte>
                <itens>
                   <item>
                     <descricao>${order.itens.item.descricao}</descricao>
                    <qtde>${order.itens.item.qtde}</qtde>
                   <vlr_unit>${order.itens.item.vlr_unit}</vlr_unit>
                  </item>
                </itens>
                <parcelas>
                   <parcela>
                       <vlr>${order.parcelas.parcela.vlr}</vlr>
                   </parcela>
                </parcelas>
                </pedido>`
                }
            });
        })
    } catch (err) {
        console.log('DEU ERRO', err);
    }


}

module.exports.sendOrder = sendOrder