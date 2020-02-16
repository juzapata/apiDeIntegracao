const express = require('express');
const pipedriveApi = require('../services/pipedrive');
const blingApi = require('../services/bling')
const Orders = require('../models/orders');
const router = express.Router()


// rota para fazer a integração entre as apis do Pipedrive e Bling, assim como enviar os pedido para o Mongo Atlas
router.get('/getDeals', async (req, res) => {
    try {
        // fazendo a primeira requisição para recuperar os deals com status won
        const deals = await pipedriveApi.getDeals();
        let allDeals = deals.data.data
        // recuperando os ids de cada deal
        let idDeals = allDeals.map(el => {
            return el.id
        })
        // formando o array de requesicões para a api do Pipedrive
        let arrayOfReq = await pipedriveApi.getProductsOfDeal(idDeals);
        // fazendo as requisições da Api do Pipedrive para recuperarmos cada produto por negócio
        let allProducts = await Promise.all(arrayOfReq)
        let arrayOfOrders = [];
        // loopings para formar o objeto do pedido que será enviado para o Mongo Atlas e formar os objetos que serão transformados em foramto XML e enviados para api do Bling
        await allDeals.forEach(async deals => {
            allProducts.forEach(async products => {
                await products.data.data.forEach(async singleProduct => {
                    if (singleProduct.deal_id === deals.id) {
                        arrayOfOrders.push({
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
                        })
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
                        );

                    }
                });
            })
        });
        // formando o array de requisições para api do Bling
        let allOrdersReq = await blingApi.sendOrder(arrayOfOrders);
        // fazendo os requests para a Api do Bling
        let result = await Promise.all(allOrdersReq);
        return res.status(200).send({ success: true, result: result });
    } catch (error) {
        return res.status(400).json({ success: false, result: error });
    }
});

// rota para recuperar os collections, ou seja, os pedidos, que estão no Mongo Atlas
router.get('/getOrders', async (req, res) => {
    try {
        let result = await Orders.find();
        return res.status(200).send({ success: true, result: result });
    } catch (err) {
        return res.status(400).send({ success: false, result: err })
    }
});

module.exports = app => app.use('/business', router);


