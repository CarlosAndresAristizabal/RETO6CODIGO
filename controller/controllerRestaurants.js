const datosModel =require('../model/schema.js')

// Mostrar
const mostrar = async () => {
    const restaurante = await datosModel.find()
    console.log(restaurante);
}
mostrar()

/*********************************** */
// Crear
const insertar = async () => {
    const datos = new datosModel({
        address: {
            building: 'Calle',
            coord: [ 80.42153, 40.7643124 ],
            street: 'los locos',
            zipcode: '200001',
        },
        borough: 'Guacoche',
        cuisine: 'callerapid',
        grades: {
            date: new Date(),
            score: 4,
        },
        comments: {
            date: new Date(),
            comment: 'Comida de mamá',
        },
        name: 'Comida Rapidas de mamá',
        restaurant_id: 752140245
    })
    const datosNuevos = await datos.save()
    console.log(datosNuevos);
    console.log('Los datos insertados correctamente');
}
insertar()
/*********************************** */
//ACTUALIZAR
const actualizarDatos = async (id) => {
    const datosActual = await datosModel.updateOne({ _id: id },
        {
            $set: {
                address: {
                    // building: 'calle',
                    // coord: [ 2153, 2135431 ],
                    // street: 'caciques',
                    // zipcode: '200014',
                },
                // borough: 'Valledupar - Cesar',
                // cuisine: 'comida rapida',
                name: 'Comida de mamá',
            }
        })
    console.log(datosActual);
    console.log('Los datos estan actualizados');
}
actualizarDatos('64ea05e50c518cedebbbf014')

/*********************************** */
//Eliminar
const eliminarDatos = async (id) => {
    const datosEliminar = await datosModel.deleteOne({ _id: id })
    console.log(datosEliminar);
    console.log('Los datos eliminados');
}
eliminarDatos('64ea05d6f23e40be4af8d026')
/*********************************** */
//Mostrar filtro por nombre
const mostrarNombre = async () => {
    const restaurante = await datosModel.find({
        name: 'comidas jj'
    }, { _id: true, cuisine: true, restaurant_id: true, 'address.street': true });
    console.log(restaurante);
}
mostrarNombre()
/*********************************** */
//Mostrar filtro por cocina
const mostrarCocina = async () => {
    const restaurante = await datosModel.find({
        cuisine: 'flaca'
    }, { _id: true, cuisine: true, restaurant_id: true, 'address.street': true });
    console.log(restaurante);
}
mostrarCocina()
/**************************************** */
// filtro de cercania segun locaclizacion
const buscarLocalizacion = async () => {
    const cercania = await datosModel.find({
        "address.coord": {
            $geoWithin: {
                $centerSphere: {
                    type: 'Point',
                    coord: [
                        0, 40 ]
                },
                $maxDistance: 5000
            }
        }
    })
    console.log(cercania);
}
buscarLocalizacion()
/******************************/
//Filtro de ordenamiento por ranking
const ordenar = async () => {
    const orden = await datosModel.find({

    }, {
        'grades.score': true, _id: true, name: true
    }).sort({
        score: 1,
    })
    console.log(orden)
}
ordenar()
/*********************************** */
//Insertar comentarios
const comentarios = async (id) => {
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
comentarios('64ea05e50c518cedebbbf014')
/*********************************** */
//añadir puntaje segun id
const puntaje = async (id) => {
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
puntaje('64ea05e50c518cedebbbf014')