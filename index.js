import express from 'express';
import expressLayouts from 'express-ejs-layouts'
import { title } from 'process';

import db from './database.js'

const app = express();

const port = 8000

app.use(express.static('static'))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(expressLayouts)
app.set('layout', 'layouts/layout')

app.use(express.json())

//pagina principal
app.get('/', (req, res) => {
    res.status(200).render('home', {
        title: 'Pagina de prueva'
    })
});

//Rutas a las tabalas de la base de datos
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM Categories', (err, result) => {
        if (err) {
            console.log('Error al ejecutar la consulta:', err)
            return res.status(500).send('Error del servidor')
        }
        res.json(result)
    })
    res.json(categories)
})
app.get('/customers', (req, res) => {
    const customers = db.prepare('SELECT * FROM Customers').all()
    res.json(customers)
})
app.get('/employees', (req, res) => {
    const employees = db.prepare('SELECT * FROM Employees').all()
    res.json(employees)
})
app.get('/orderdetails', (req, res) => {
    const orderdetails = db.prepare('SELECT * FROM OrderDetails').all()
    res.json(orderdetails)
})
app.get('/orders', (req, res) => {
    const orders = db.prepare('SELECT * FROM Orders').all()
    res.json(orders)
})
app.get('/product', (req, res) => {
    const products = db.prepare('SELECT * FROM Products').all()
    res.json(products)
})
app.get('/shippers', (req, res) => {
    const shippers = db.prepare('SELECT * FROM Shippers').all()
    res.json(shippers)
})
app.get('/suppliers', (req, res) => {
    const suppliers = db.prepare('SELECT * FROM Suppliers').all()
    res.json(suppliers)
})
app.get('/sqlitesequence', (req, res) => {
    const sqlite_sequence = db.prepare('SELECT * FROM sqlite_sequence').all()
    res.json(sqlite_sequence)
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
