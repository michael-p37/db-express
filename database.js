// import Database from 'better-sqlite3'
// const db = new Database('./northwind-db.db')

// export default db
import mysql from 'mysql'
const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: './northwind-db.db'
})

db.connect((err) => {
    if (err) {
        console.log('Error de coneccion')
        return
    }
    console.log('Coneccion exitosa')

})
db.end()
export default db