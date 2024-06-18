const express = require('express')
const empeladoRouter= express.Router()

//declaramos un objeto del modelo
let Empleado = require('../models/empleado')
const empleado = require('../models/empleado')

//metodo para agregar un empleado nuevo
empeladoRouter.route('/agregar').post((req,res)=>{
    empleado.create(req.body)
    .then((data)=>{
        console.log('Se inserto un empleado')
        res.send(data)
    })
    .catch((error)=>{
        console.error(error)
    })
})

//obtener todos lso empleados de la base de datos
empeladoRouter.route('/empleados').get((req,res)=>{
    empleado.find()
    .then((data)=>{
        res.send(data)
    })
    .catch((error)=>{
        console.error(error)
    })
})

//obtener un solo empleado por medio de su ID

empeladoRouter.route('/empleado/:id').get((req,res)=>{
    empleado.findById(req.params.id)
    .then((data)=>{
        res.send(data)
    })
    .catch((error)=>{
        console.error(error)
    })
})


//actualizar un empleado

empeladoRouter.route('/actualizar/:id').put((req,res)=>{
    empleado.findByIdAndUpdate(req.params.id,{
        $set: req.body
    })
    .then((data)=>{
        console.log('Se actualizó el empleado')
        res.send(data)
    })
    .catch((error)=>{
        console.error(error)
    })
})

// eliminar un empleado

empeladoRouter.route('/delete/:id').delete((req,res)=>{
    empleado.findByIdAndDelete(req.params.id)
    .then((data)=>{
        console.log('Se elimino el empleado')
        res.send(data)
    })
    .catch((error)=>{
        console.error(error)
    })
})

module.exports = empeladoRouter;