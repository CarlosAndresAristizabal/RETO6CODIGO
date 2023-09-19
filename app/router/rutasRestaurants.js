const express = require('express')
const router = require("express").Router();
const restaurante = require('../controller/controllerRestaurants');
const bodyParser = require('body-parser');
const datosModel = require('../model/schema');



// mostar todo
router.get("/mostrarDB", async (req, res) => {
    restaurante.mostrar()
        .then(doc => { res.json({ response: doc }) })
        .catch(err => {
            console.log('Error al consultar elementos...', err);
            res.json({ response: 'fallo!' });
        })
});

// Crear restaurante
router.post("/Crear", async (req, res) => {
    try {
        const sitio = req.body
        await restaurante.insertar(sitio)
        res.redirect('/mostrarDB')
    } catch (error) {
        console.log(error);
    }
}
);

// Eliminar por nombre
router.post("/eliminarNombre", async (req, res) => {
    try {
        const sitio = req.body
        const nombre = await restaurante.eliminarDatos(sitio)
        res.json({ message: 'Datos eliminado' })
    } catch (error) {
        console.log(error);
    }
});

// Busqueda por nombre
router.post("/mostrarNombre", async (req, res) => {
    try {
        const sitio = req.body
        const nombre = await restaurante.mostrarNombre(sitio)
        res.json({ message: nombre })
    } catch (error) {
        console.log(error);
    }
});

//Actualizar por ID
router.post("/actualizarDatos", async (req, res) => {
    try {
        const sitio = req.body
        const datos = await restaurante.actualizarDatos(sitio)
        res.json({ message: 'datos actualizados' })
    } catch (error) {
        console.log(error);
    }
})

// Busqueda por Cocina
router.post("/mostrarCocina", async (req, res) => {
    try {
        const sitio = req.body
        const nombre = await restaurante.mostrarCocina(sitio)
        res.json({ message: nombre })
    } catch (error) {
        console.log(error);
    }
});

//Busqeuda de distancia geopatial
router.post("/distancia", async (req, res) => {
    try {
        const sitio = req.body
        const nombre = await restaurante.mostrarDistancia(sitio)
        res.json({ message: 'Busqueda realizada' })

    } catch (error) {
        console.log(error);
    }
})

//insertar comentario por ID
router.post("/insertarComentario", async (req, res) => {
    try {
        const sitio = req.body
        const datos = await restaurante.insertarComentario(sitio)
        res.json({ message: 'Comentario insertado correctamente' })
    } catch (error) {
        console.log(error);
    }
})

//insertar calificación por ID
router.post("/insertarCalificacion", async (req, res) => {
    try {
        const sitio = req.body
        const datos = await restaurante.insetarCalificacion(sitio)
        res.json({ message: 'Calificación insertado correctamente' })
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;

