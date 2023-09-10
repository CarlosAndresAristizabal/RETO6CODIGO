const mongoose = require("mongoose");


//Creacion  del schema de la DB
module.exports = mongoose => {
    var datosSchema = mongoose.Schema({
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
        restaurant_id: { type: Number, required: true }
    }, { versionKey: false });

    //Incorporar schema al modelo
    const datosModel = mongoose.model('lugares', datosSchema);
    return datosModel;
}
