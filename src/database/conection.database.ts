/*#####################################*/
//! Imports
import { createPool }  from 'mysql2/promise'
import { _db_host_, _db_name_, _db_port_, _db_password_, _db_user_ } from '../environments/environments'
/*#####################################*/
//? -> Config
//* Configuracion de conexion pool mysql
const db_connect = createPool({
    host: _db_host_,
    user: _db_user_,
    password: _db_password_,
    database: _db_name_,
})
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    db_connect
}