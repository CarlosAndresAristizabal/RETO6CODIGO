const mongoose = require('mongoose')
const url = 'mongodb://localhost/restaurante'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((e) => console.log('El error de conexión es: ' + e))

const datosSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: {
        building: { type: String },
        coord: { type: [ Number ] },
        street: { type: String },
        zipcode: { type: String }
    },
    borough: { type: String },
    cuisine: { type: String },
    image: { type: String },
    schedule: { type: String },
    grades: [ {
        date: { type: Date },
        score: { type: Number },
    } ],
    comments: [ {
        date: { type: Date },
        comment: { type: String },
    } ]
});
const datosModel = mongoose.model('lugares', datosSchema)

// Mostrar
const mostrar = async () => {
    const restaurante = await datosModel.find()
    console.log(restaurante);
}

mostrar()