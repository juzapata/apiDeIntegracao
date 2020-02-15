const express = require('express');
const pipedriveApi = require('../services/pipedrive');
const axios = require('axios');
const router = express.Router()


router.get('/getDeals', async (req, res) => {
    try {
        const deals = await pipedriveApi.getDeals();
        
        let alDeals = deals.data.data.map(el => {
            return el.id
        })
        let arrayOfReq = await pipedriveApi.getProductsOfDeal(alDeals);
        let bubu = await Promise.all(arrayOfReq)
        console.log('BUBU', bubu[0]);
        obj = {
            "cliente": {
                "nome": "" //nintendo
            },
            "transporte": {
                "volumes": {
                    "volume": {
                        "servico": "" //email da pessoa
                    }
                }
            },
            "itens": {
                "item": {
                    "descricao": "", // Switch
                    "qtde": 0, 
                    "vlr_unit": 0
                }
            },
            "parcelas": {
                "parcela": {
                    "vlr": 0 // valor total
                }
            }
        }


        // pegar o nome do produto
        // let namesOfProducts = await bubu.map(name => bubu.data)
        // console.log(bubu[0]);
        // mandar em JSON usando o model pro Mongo Atlas
        // mandar pro bling me XML
        // retornar a colletion 
        // console.log('DEAL TWO', dealsTwo)
        return res.send({ "resultado": bubu[0].data }); // aqui, também colocamos o token de autenticação para quando novo usuário se cadastrar, ele também receber o token 
    } catch (error) {
        return res.json({ error });
    }
});
module.exports = app => app.use('/business', router);


