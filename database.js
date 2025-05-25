import mysql from "mysql"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'michael',
    password: 'minombre',
    database: 'my_db'
})
connection.connect((err) => {
    if (err) {
        console.log('Error de coneccion')
        return
    }
    console.log('Coneccion exitosa')
})
connection.end()


export default connection;