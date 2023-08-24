const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const app = express();
const url = 'mongodb://localhost:27017/restaurantes';

//Creación de body html y ubicación
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Conexion a mongoDB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((e) => console.log('El error de conexión es: ' + e))

//Creacion  del schema de la DB
const datosSchema = mongoose.Schema({
    address: {
        building: { type: String },
        coord: { type: [ String ] },
        street: { type: String },
        zipcode: { type: String }
    },
    borough: { type: String },
    cuisine: { type: String },
    grades: [ {
        date: { type: Date },
        score: { type: Number },
    } ],
    comments: [ {
        date: { type: Date },
        comment: { type: String },
    } ],
    name: { type: String, required: true },
}, { versionKey: false });
//Incorporar schema al modelo
const datosModel = mongoose.model('lugares', datosSchema);

//Creación del servidor express
app.listen(3000, () => {
    console.log('servidor listo...');
});



// Mostrar
// const mostrar = async () => {
//     const restaurante = await datosModel.find()
//     console.log(restaurante);
// }
// mostrar()

/*********************************** */
//Crear
// const insertar = async () => {
//     const datos = new datosModel({
//         address: {
//             building: 'calle',
//             coord: [ '2153, 2135431' ],
//             street: 'caciques',
//             zipcode: '200014',
//         },
//         borough: 'valledupar',
//         cuisine: 'comida rapida',
//         grades: {
//             // date: ,
//             score: 4,
//         },
//         comments: {
//             // date: ,
//             comment: 'comidd sabarosa',
//         },
//         name: 'calle de mama',
//     })
//     const datosNuevos = await datos.save()
//     console.log(datosNuevos);
// }
// insertar()

/*********************************** */
//Mostrar filtro por nombre
// const mostrarNombre = async () => {
//     const restaurante = await datosModel.find({
//         name: 'Brunos On The Boulevard'
//     }, { _id: true, cuisine: true, restaurant_id: true, 'address.street': true });
//     console.log(restaurante);
// }
// mostrarNombre()

/*********************************** */
//ACTUALIZAR
// const actualizarDatos = async (id) => {
//     const datosActual = await datosModel.updateOne({ _id: id },
//         {
//             $set: {
//                 address: {
//                     building: 'calle',
//                     coord: [ '2153, 2135431' ],
//                     street: 'caciques',
//                     zipcode: '200014',
//                 },
//                 borough: 'Valledupar - Cesar',
//                 cuisine: 'comida rapida',
//                 grades: {
//                     // date: ,
//                     score: 4,
//                 },
//                 comments: {
//                     // date: ,
//                     comment: 'sabroso',
//                 },
//                 name: 'calle de mama',
//             }
//         })
//     console.log(datosActual);
// }

// actualizarDatos('64df8bd37713aa0bc02ebaec')

/*********************************** */
//Eliminar
// const eliminarDatos = async (id) => {
//     const datosEliminar = await datosModel.deleteOne({ _id: id })
//     console.log(datosEliminar);
// }
// eliminarDatos('64df8bd37713aa0bc02ebaec')

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