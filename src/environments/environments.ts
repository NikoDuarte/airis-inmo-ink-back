/*#####################################*/
//! Imports
import dotenv from 'dotenv'
/*#####################################*/
//? -> Configs
dotenv.config()
/*#####################################*/
//? -> Variables no exportables
/*#####################################*/
//? -> Variables exportables
/*#####################################*/
//* |-> Bloque de variables servidor
const _port_: number = Number(process.env.PORT)
const _path_default_: string = String(process.env.PATH_DEFAULT)
/*#####################################*/
//* |-> Bloque de variables DB
const _db_host_: string = String(process.env.DB_HOST)
const _db_port_: string = String(process.env.DB_PORT)
const _db_user_: string = String(process.env.DB_USER)
const _db_password_: string = String(process.env.DB_PASSWORD)
const _db_name_: string = String(process.env.DB_NAME)
/*#####################################*/
//* |-> Bloque de variables Token
const _token_secret_key_: string = String(process.env.SECRET_KEY_TOKEN)
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    _port_,
    _db_host_,
    _db_port_,
    _db_user_,
    _db_password_,
    _db_name_,
    _path_default_,
    _token_secret_key_
}