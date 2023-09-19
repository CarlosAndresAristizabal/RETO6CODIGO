const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Creacion  del schema de la DB
const datosSchema = new schema({
    address: {
        building: { type: String },
        type: {
            type: String,
            enum: [ 'Point' ],
        },
        coord: { type: [ Number ] },
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
module.exports = datosModel;

//indexes 
datosSchema.index({ 'address.coord': '2dsphere' });