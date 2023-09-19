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
// Busqueda por nombre
router.post("/mostrarNombre", async (req, res) => {
    try {
        const sitio = req.body
        // console.log(sitio)
        const nombre = await restaurante.mostrarNombre(sitio)
        res.json({ message: nombre })
    } catch (error) {
        console.log(error);
    }
});

// Eliminar por ID
router.post("/eliminarNombre", async (req, res) => {
    try {
        const sitio = req.body
        const nombre = await restaurante.eliminarDatos(sitio)
        res.json({ message: 'Datos eliminado' })
    } catch (error) {
        console.log(error);
    }
});

/*
// Mostrar por nombre de restaurante
 
// Mostrar por cuisine
router.get("/cuisine", restaurante.mostrarCocina());
 

 
// Eliminar por ID
router.delete("/:id", restaurante.eliminarDatos());
 
// Busqueda Geopatial
router.get("/:id", restaurante.buscarLocalizacion());
 
// Ordenar por calificación
router.get("/", restaurante.ordenar());
 
//Insertar comentario por id
router.post("/:id", restaurante.puntaje());
 
//insertar comentario segun su id
router.post("/:id", restaurante.comentarios())
 
// app.use("/api/restaurante", router);*/

module.exports = router;

