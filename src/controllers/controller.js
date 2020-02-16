const express = require('express');
const pipedriveApi = require('../services/pipedrive');
const Orders = require('../models/orders');



const router = express.Router()


router.get('/getDeals', async (req, res) => {
    try {
        // fazendo a primeira requisição para recuperar os deals com status won
        const deals = await pipedriveApi.getDeals();
        let allDeals = deals.data.data
        // recuperando os ids de cada deal
        let idDeals = allDeals.map(el => {
            return el.id
        })
        // fazendo a segunda requisição para recuperar os produtos de cada deal, através de seu id
        let arrayOfReq = await pipedriveApi.getProductsOfDeal(idDeals);
        let bubu = await Promise.all(arrayOfReq)
        let arrayOfOrders = [];
        // loopings para formar o objeto do pedido que será enviado para o Mongo Atlas
        await allDeals.forEach(async deals => {
            bubu.forEach(async products => {
                await products.data.data.forEach(async singleProduct => {
                    if (singleProduct.deal_id === deals.id) {
                        await Orders.create({
                            "cliente": {
                                "id": deals.id,
                                "nome": deals.org_id.name
                            },
                            "transporte": {
                                "volumes": {
                                    "volume": {
                                        "servico": deals.person_id.email[0].value
                                    }
                                }
                            },
                            "itens": {
                                "item": {
                                    "descricao": singleProduct.name,
                                    "qtde": singleProduct.quantity,
                                    "vlr_unit": singleProduct.item_price
                                }
                            },
                            "parcelas": {
                                "parcela": {
                                    "vlr": singleProduct.sum
                                }
                            }
                        }
                        )
                    }
                })
            })
        });


        return res.status(200).send({ success: true, result: 'Dados foram enviados para o mongo' });
    } catch (error) {
        return res.status(400).json({ success: false, result: error });
    }
});

router.get('/getOrders', async (req, res) => {
    try {
        let result = await Orders.find();
        return res.status(200).send({success: true, result: result});
    } catch (err) {
        return res.status(400).send({ success: false, result: err})
    }
});


module.exports = app => app.use('/business', router);


