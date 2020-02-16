const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


mongoose.connect('mongodb+srv://ju_zapata:rBErUVPN2Udug6bC@cluster0-suwoq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado com a base de dados...');
}).catch(err => console.log(err));

require('./controllers/controller')(app);

app.listen(3000, () => console.log("Servidor começou na porta 3000..."));

