const express = require('express');
const pipedriveApi = require('../services/pipedrive');

const router = express.Router()


router.get('/getDeals', async (req, res)=>{
    try{
        console.log("entrou na rota");
        const deals = await pipedriveApi.getDeals()
        console.log("DEALS", deals.data.data[0]);
        // mandar em JSON usando o model pro Mongo Atlas
        // mandar pro bling me XML
        // retornar a colletion 
        return res.send({"resultado": deals.data.data}); // aqui, também colocamos o token de autenticação para quando novo usuário se cadastrar, ele também receber o token 
    } catch (error){
        return res.status(400).send({error});
    }
});

module.exports = app => app.use('/business', router);
