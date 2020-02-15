// model dos deals que vamos colocar no Mongo
const mongoose = require('../server');

const OrderSchema = new mongoose.Schema({
    order: {
        cliente: {
           nome: {
               type: String, // nome: Nintendo
               required: true
            }
        },
        transporte: {
           volumes: {
              volume: {
                 servico: {
                     type: String, // email da pessoa
                     required: true
                 }
              }
           }
        },
        itens: {
           item: {
              descricao: {
                 type: String, ///Switch
                 required: true
              },
              qtde: {
                 type: Number, //decimal
                 required: true
              },
              vlr_unit: {
                type: Number,
                required: true
              }
           }
        },
        parcelas: {
           parcela: {
              vlr: {
                type: Number,
                required: true
              }
           }
        }
     },
    createdAt: {
        type: Date,
        default: Date.now
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