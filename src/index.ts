/*#####################################*/
//! Imports
import express from 'express'
import cors from 'cors'
//* |-> Environments
import { _port_, _path_default_ } from './environments/environments'
//* |-> Routes
import router_users from './routes/users.routes'
import router_inmueble from './routes/inmueble.routes'
import router_auth from './routes/auth.routes'
/*#####################################*/
//? -> Configs
const app: express.Application = express()
//* |-> Configuracion del CORS
app.use(cors())
//* |-> Lectura y apertura de datos JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json())
/*#####################################*/
//? -> Routes
app.use(`${_path_default_}/users`, router_users)
app.use(`${_path_default_}/auth`, router_auth)
app.use(`${_path_default_}/inmueble`, router_inmueble)
/*#####################################*/
app.get('*', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/14362863/2s9YXpWeJo');
})
/*#####################################*/
//? -> Init Server
app.listen(_port_, () => console.log(`Server online in port: ${ _port_ }`))