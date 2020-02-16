// model dos deals que vamos colocar no Mongo
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
  cliente: {
      id: Number,
      nome: String
    },
    transporte: {
      volumes: {
        volume: {
          servico: String
        }
      }
    },
    itens: {
      item: {
        descricao: String,
        qtde: Number,
        vlr_unit: Number
      }
    },
    parcelas: {
      parcela: {
        vlr: Number
      }
    }
  
})

const Orders = mongoose.model('Orders', OrderSchema);

module.exports = Orders;

// {
//    "cliente": {
//       "nome": "String"
//    },
//    "transporte": {
//       "volumes": {
//          "volume": {
//             "servico": "String"
//          }
//       }
//    },
//    "itens": {
//       "item": {
//          "descricao": "String",
//          "qtde": "Decimal",
//          "vlr_unit": "Decimal"
//       }
//    },
//    "parcelas": {
//       "parcela": {
//          "vlr": "decimal"
//       }
//    }
// }