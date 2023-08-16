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
});
//Incorporar schema al modelo
const datosModel = mongoose.model('lugares', datosSchema);

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

//actualizar datos
app.post('/actualizar', (req, res) => {

    const id = req.params._id;
    const comentarios = req.params.comment = 'text';

    datosModel.findByIdAndUpdate({ _id: id }, { $set: { comment: comentarios } }, { useFindAndModify: false })
        .then(doc => { res.json({ reponse: 'succes' }) })
        .catch(err => {
            console.log('Error al actualizar dato', err.message);
            res.json({ response: 'falla ${id} no enconrtrado' })
        })
})


//Creación del servidor express
app.listen(3000, () => {
    console.log('servidor listo...');
});



// Mostrar
const mostrar = async () => {
    const restaurante = await datosModel.find()
    console.log(restaurante);
}

mostrar()
