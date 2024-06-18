const express = require('express')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const cors = require('cors')

//coneccion con la bd
mongoose.connect('mongodb://127.0.0.1:27017/empleados')
.then((x)=>{
    console.log(`Conectado exitosamente a la base de datos ${x.connections[0].name}`)
})
.catch((error)=>{
console.log('Error de coneccion: ',error.reason)
})

//configuracion del servidor web
const empleadoRouter = require('./routes/empleado.routes')
const empeladoRouter = require('./routes/empleado.routes')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false,}))
app.use(cors())
app.use('/api',empeladoRouter)

//habilitar el puerto 
const port = process.env.PORT || 4000
const server = app.listen(port,()=>{
    console.log('escuchando en el puerto: '+port)
})

//manejadores de errores
app.use((req,res,next)=>{
    next(createError(404))
})

//manejador de errores
app.use(function(err,req,res,next){
    console.log(err.message)
    if(!err.statusCode)err.statusCode=500
    res.status(err.statusCode).send(err.message)
})