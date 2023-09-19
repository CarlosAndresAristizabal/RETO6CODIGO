const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const app = express();
const puerto = 3000;

//Creación de body html y ubicación
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Conexion a mongoDB
const urlConexion = 'mongodb://localhost:27017/restaurantes'
mongoose.connect(urlConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((e) => console.log('El error de conexión es: ' + e))

//Creación del servidor express
app.listen(puerto, () => {
    console.log('servidor listo...');
});

app.get("/", (req, res) => {
    res.json({ 'message': 'Bienvenido a tattler API' })
})

app.use('/', require('./app/router/rutasRestaurants'));

