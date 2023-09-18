module.exports = app => {
    const restaurante = require("../app/controller/controllerRestaurants");

    var router = require("express").Router();

    // Crear restaurante
    router.post("/", restaurante.insertar);

    // mostar todo
    router.get("/", restaurante.mostrar);

    // Mostrar por nombre de restaurante
    router.get("/name", restaurante.mostrarNombre);

    // Mostrar por cuisine
    router.get("/cuisine", restaurante.mostrarCocina);

    // Retrieve Restaurant by name and cuisine
    router.get("/cuisine", restaurante.findByNameAndCuisine);

    // Actualizar por ID
    router.put("/:id", restaurante.actualizarDatos);

    // Eliminar por ID
    router.delete("/:id", restaurante.eliminarDatos);

    // Busqueda Geopatial
    router.get("/:id", restaurante.buscarLocalizacion);

    // Ordenar por calificación
    router.get("/", restaurante.ordenar);

    //Insertar comentario por id
    router.post("/:id", restaurante.puntaje);

    //insertar comentario segun su id
    router.post("/:id", restaurante.comentarios)

    app.use("/api/restaurante", router);
};