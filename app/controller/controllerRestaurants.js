const datosModel = require('../model/schema')
const model = datosModel
const bodyParser = require('body-parser')


// Mostrar
module.exports.mostrar = async (req, res) => {
    try {
        const restaurante = await datosModel.find()
        return restaurante

    } catch (error) {
        console.log(error);
    }
}

/*********************************** */
// Crear
module.exports.insertar = async (sitioData) => {
    const body = sitioData
    const str = body.coord;
    const coordenadas = str.split(',').map(Number);
    const datos = new datosModel({
        address: {
            building: body.building,
            coord: (coordenadas),
            street: body.street,
            zipcode: body.zipcode,
        },
        borough: body.borough,
        cuisine: body.cuisine,
        grades: {
            date: new Date(),
            score: body.score,
        },
        comments: {
            date: new Date(),
            comment: body.comment,
        },
        name: body.name,
        restaurant_id: parseInt(body.restaurant_id),
    })
    const datosNuevos = await datos.save()
    return datosNuevos;
    console.log('Los datos insertados correctamente' + datosNuevos);
}

/*********************************** */
//Mostrar filtro por nombre
module.exports.mostrarNombre = async (name) => {
    const body = name
    const nombre = await datosModel.findOne({
        name: body.name
    });
    return nombre
}
/*********************************** */
//Eliminar
module.exports.eliminarDatos = async (name) => {

    try {
        const body = name
        const datos = await datosModel.findOneAndDelete({ name: body.name })
        return datos
    } catch (error) {
        console.log(error);
    }
};

/*********************************** */
//ACTUALIZAR
module.exports.actualizarDatos = async (id) => {
    const body = id
    const datosActual = await datosModel.updateOne({ _id: body },
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
                name: 'Uhele Rico y sabroso',
            }
        })
    console.log('Los datos estan actualizados');
}

/*********************************** */
//Mostrar filtro por cocina
module.exports.mostrarCocina = async (cuisine) => {
    const body = cuisine
    const restaurante = await datosModel.find({
        cuisine: body.cuisine

    });
    return restaurante

    // console.log(restaurante);
}
/******************************
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
module.exports.insertarComentario = async (id) => {
    const body = id
    const datosActual = await datosModel.updateOne({ _id: body },
        {
            $push: {
                comments: {
                    date: new Date(),
                    comment: 'La mejor comida',
                },
            }
        }
    )
    console.log('El comentario insertado');
}
/*********************************** */
//añadir calificaion segun id
module.exports.insetarCalificacion = async (id) => {
    const body = id
    const datosActual = await datosModel.updateOne(
        { _id: body },
        {
            $push: {
                grades: {
                    date: new Date(),
                    score: 3,
                }
            }
        }
    )
    console.log('La calificación insertada');
}

/**************************************** */
// filtro de cercania segun locaclizacion

module.exports.mostrarDistancia = async (id) => {
    const posicion = await datosModel.findById(id)
    const lat = posicion.address.coord[ 1 ];
    const long = posicion.address.coord[ 0 ];
    const cercania = await datosModel.aggregate([ {
        $geoNear: {
            near: {
                type: 'Point',
                coordinates: [ lat, long ]
            },
            distanceField: 'dist.calculated',
            $maxDistance: 5000,
            query: { 'address.street': 'caciques' },
            spherical: true,
        }
    } ])

    console.log(cercania);
}
