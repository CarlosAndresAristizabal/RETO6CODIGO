const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const app = express();
const urlConexion = require('../DB_MongoDB/conexion.js')

//Creación de body html y ubicación
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Conexion a mongoDB
mongoose.connect(urlConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((e) => console.log('El error de conexión es: ' + e))

//Creación del servidor express
app.listen(3000, () => {
    console.log('servidor listo...');
});





// FRONTEND
app.post('/add', (req, res) => {

    const restaurante = new datosModel({
        address: {
            building: req.body.building,
            coord: [ req.body.coord ],
            street: req.body.street,
            zipcode: req.body.zipcode,
        },
        borough: req.body.borough,
        cuisine: req.body.cusine,
        // schedule: (req.body.scheduleInicio + ' - ' + req.body.schedulefinal),
        grades: {
            date: req.body.scheduleComment,
            score: req.body.grades,
        },
        comments: {
            date: req.body.scheduleComment,
            comment: req.body.comments,
        },
        name: req.body.text,
    })
    restaurante.save().then(doc => {
        console.log('Dato ingresasdo correctamente ...', doc);
        res.json({ response: 'success' })
    }).catch(err => {
        console.log('Error al insertar', err.message); res.json({ response: 'falla' })
    })
});

//Consultar DB
app.get('/consultaTodaDB', (req, res) => {
    datosModel.find().then(doc => { res.json({ response: 'success', data: doc }) }).catch(err => {
        console.log('Error al consultar elementos...', err.message); res.json({ response: 'falla' })
    })
})