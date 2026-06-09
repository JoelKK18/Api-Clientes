const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

app.listen(port, () => {
  console.log(`Servicio Iniciado`)
})

//Muestra todos los creditos activos

app.get('/creditos', (req,res) => {
    const contenido = fs.readFileSync('clientes.json')
    const data= JSON.parse(contenido)
    const clientes = data.filter(cliente => cliente.activo === true);
    res.send(clientes)
})

//Muestra todos los creditos activos mayores al ingresado

app.get('/creditos/:importe', (req,res) => {
    const contenido = fs.readFileSync('clientes.json')
    const data = JSON.parse(contenido)
    const importe = Number(req.params.importe);
    const credito = data.filter(cliente => cliente.activo === true && cliente.credito > importe);
    res.send(credito)
})

//Muestra informacion de un cliente especifico

app.get('/creditos-cliente/:id', (req,res) => {
    const { id } = req.params;
    const contenido = fs.readFileSync('clientes.json')
    const data = JSON.parse(contenido)
    const encontrado = data.find((x) => x.id == id)
    if (!encontrado){
        res.status(404).json({mensaje: 'No encontrado'})
    } else {
        res.send(encontrado)
    }
})
