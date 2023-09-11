const datosModel = require('../model/schema.js')
const { ObjectId } = require('mongoose').Types;


// Mostrar
module.exports.mostrar = async () => {
    const restaurante = await datosModel.find()
    console.log(restaurante);
}

/*********************************** */
// Crear
module.exports.insertar = async (building, coord, street, zipcode, borough, cuisine, score, comment, name, restaurant_id) => {
    const datos = new datosModel({
        address: {
            building,
            coord,
            street,
            zipcode,
        },
        borough,
        cuisine,
        grades: {
            date: new Date(),
            score,
        },
        comments: {
            date: new Date(),
            comment,
        },
        name,
        restaurant_id
    })
    const datosNuevos = await datos.save()
    console.log('Los datos insertados correctamente');
}
/*********************************** */
//ACTUALIZAR
module.exports.actualizarDatos = async (id) => {
    const datosActual = await datosModel.updateOne({ _id: id },
        {
            $set: {
                address: {
                    building: 'calle',
                    coord: [ 21.53, 21.35431 ],
                    street: 'caciques',
                    zipcode: '200014',
                },
                borough: 'Valledupar - Cesar',
                cuisine: 'comida rapida',
                name: 'Comida de mamá',
                grades: {
                    date: new Date(),
                    score: 5,
                },
                comments: {
                    date: new Date(),
                    comment: 'comida sabrosa',
                },
                name: 'Uhele Rico',
                restaurant_id: 123546
            }
        })
    console.log('Los datos estan actualizados');
}

/*********************************** */
//Eliminar
module.exports.eliminarDatos = async (id) => {
    const datosEliminar = await datosModel.deleteOne({ _id: id })
    console.log('Los datos eliminados');
}
/*********************************** */
//Mostrar filtro por nombre
module.exports.mostrarNombre = async (name) => {
    const restaurante = await datosModel.find({
        name: name

    }, { _id: false, name: true, borough: true, 'address.building': true, cuisine: true, restaurant_id: true, 'address.street': true });
    console.log(restaurante);
}

/*********************************** */
//Mostrar filtro por cocina
module.exports.mostrarCocina = async () => {
    const restaurante = await datosModel.find({
        cuisine: 'flaca'
    }, { _id: false, name: true, borough: true, 'address.building': true, cuisine: true, restaurant_id: true, 'address.street': true });
    console.log(restaurante);
}
/******************************/
//Filtro de ordenamiento por ranking
module.exports.ordenar = async () => {
    const orden = await datosModel.find({

    }, {
        'grades.score': true, _id: true, name: true
    }).sort({
        score: 1,
    })
    console.log(orden)
}
/*********************************** */
//Insertar comentarios
module.exports.comentarios = async (id) => {
    const datosActual = await datosModel.updateOne(
        { _id: id },
        {
            $push: {
                comments: {
                    date: new Date(),
                    comment: 'sabrosa la comida de maá',
                },
            }
        }
    )
    console.log(datosActual);
    console.log('El comentario insertado');
}
/*********************************** */
//añadir puntaje segun id
module.exports.puntaje = async (id) => {
    const datosActual = await datosModel.updateOne(
        { _id: id },
        {
            $push: {
                grades: {
                    date: new Date(),
                    score: 5,
                }
            }
        }
    )
    console.log(datosActual);
    console.log('La calificación insertada');
}
/**************************************** */
// filtro de cercania segun locaclizacion

module.exports.buscarLocalizacion = async () => {
    const cercania = await datosModel.aggregate([ {
        $geoNear: {
            near: {
                type: 'Point',
                coord: [ 0, 40 ]
            },
            distanceField: 'distancie',
            $maxDistance: 5000 * 1000,
            spherical: true,
        }
    } ])
    console.log(cercania);
}
