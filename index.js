//* Importando Express JS
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//* Conectar a la base de datos MySQL -----------------------------
db.authenticate()
    .then( () => {
        console.log('Base de datos conectada')
    })
    .catch( error => console.log(error) )

//* Definir puerto
const port = process.env.PORT || 4000;

//* Habilitando PUG
app.set('view engine', 'pug');

//* Obtener el anio actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.ActualYear = year.getFullYear() // Midelware
    res.locals.nombreSitio = "Agencia de Viajes"

    return next(); // para que siga con el siguiente codigo
})

//* Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//* Definir la carpeta publica
app.use(express.static('public'));

//* Agregar Router
app.use('/', router)



// esta funciona arranca el servidor
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
} )



