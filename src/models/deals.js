// model dos deals que vamos colocar no Mongo
const mongoose = require('../server');

const UserSchema = new mongoose.Schema({
    deal: {},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Deals = mongoose.model('Deals', UserSchema);

module.exports = Deals;