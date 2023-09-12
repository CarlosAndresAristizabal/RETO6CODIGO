const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const app = express();
const datosBD = require('./controller/controllerRestaurants.js')

//Creación de body html y ubicación
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public'));

//Conexion a mongoDB
const urlConexion = 'mongodb://localhost:27017/restaurantes'
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

/*************************** */

//Mostraremos todos los datos de la base de datos
// datosBD.mostrar();

/*************************** */
//Para insertar sigue el orden delos paramentros =>(building, coord, street, zipcode, borough, cuisine, score, comment, name, restaurant_id), todos los paramentros son tipo string, exento coord que va en un array de tipo numerico y (score y restaurant_id es de tipo numerico).


// datosBD.insertar('840', [ 72.5254, -25.25052 ], 'Los Caciques Upar', '20008', 'Valledupar', 'Zona de Carreterras', 4, 'La comida mas rapida y rica', 'comidasRapidas de JOE', 14253);

/************************* */
//Antes de ejecutar la actualización de datos ve a controller y modifica las claves a modificar y luego llama
// datosBD.actualizarDatos('64e92da34d0aee2e6abb35a4')

/************************* */
//Puedes elilminar un documento por medio del ID
// datosBD.eliminarDatos('64e92da34d0aee2e6abb35a4')

// /=================================/
// /============FILTROS==============/

/************************* */
//Filtro por nombre de restaurante
// datosBD.mostrarNombre('Frutas');

/************************* */
//Filtro por nombre de Cocina
// datosBD.mostrarCocina('Zona de Carreteras');


/************************* */
//Filtro por id de geospacial , encontrando la distancia entre los resturantes
// datosBD.buscarLocalizacion('64e725b9240b29c3965470fb')

/************************* */
//Filtro Ordenar por calificación
// datosBD.ordenar()

// /=================================/
// /=========== iNSERTAR COMENTARIOS Y CALIFICACION ==============

/************************* */
//Filtro Ordenar por calificación
// datosBD.puntaje('64e725b9240b29c3965470fb')

/************************* */
//Filtro Ordenar por calificación
// datosBD.comentarios('64e725b9240b29c3965470fb')






// FRONTEND
// app.post('/add', (req, res) => {

//     const restaurante = new datosModel({
//         address: {
//             building: req.body.building,
//             coord: [ req.body.coord ],
//             street: req.body.street,
//             zipcode: req.body.zipcode,
//         },
//         borough: req.body.borough,
//         cuisine: req.body.cusine,
//         // schedule: (req.body.scheduleInicio + ' - ' + req.body.schedulefinal),
//         grades: {
//             date: req.body.scheduleComment,
//             score: req.body.grades,
//         },
//         comments: {
//             date: req.body.scheduleComment,
//             comment: req.body.comments,
//         },
//         name: req.body.text,
//     })
//     restaurante.save().then(doc => {
//         console.log('Dato ingresasdo correctamente ...', doc);
//         res.json({ response: 'success' })
//     }).catch(err => {
//         console.log('Error al insertar', err.message); res.json({ response: 'falla' })
//     })
// });

// Consultar DB
// app.get('/consultaTodaDB', (req, res) => {
//     datosModel.find().then(doc => { res.json({ response: 'success', data: doc }) }).catch(err => {
//         console.log('Error al consultar elementos...', err.message); res.json({ response: 'falla' })
//     })
// })