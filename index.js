import express from 'express';
import path from 'path'
import expressLayouts from 'express-ejs-layouts'
import { title } from 'process';
import cors from 'cors'
import connection from './database.js'

const port = 8000
// const express = require("express");
const app = express();

app.use(express.static('static'))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(expressLayouts)
app.set('layout', 'layouts/layout')

app.use(cors())

//pagina principal
app.get('/', (req, res) => {
    res.status(200).render('home', {
        title: 'Pagina de prueva'
    })
});

app.get('/user',(req,res) => {
    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        console.log('La solucion es: ', rows[0].solution) 
    })
})

app.get('/products', (req, res) => {
  res.status(200).render('products', {
    title: 'Productos'
  })
})

const autenticar = (req, res, next) => {
    if (req.headers.token === '1234') {
        next();
    } else {
        res.status(401).send('No autorizado');
    }
};
app.get('/privado', autenticar, (req, res) => {
    res.send('Acceso concedido');
});
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
