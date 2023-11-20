/*#####################################*/
//! Imports
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
//* |-> Environments
import { _token_secret_key_ } from '../environments/environments'
import { $response_http } from '../services/globals.services'
import { db_connect } from '../database/conection.database'
/*#####################################*/
//* |-> Middleware que validara un token
const $$valid_token = async (req: Request | any, res: Response, next: NextFunction) => {
    //* |-> Capturamos el token
    const token = req.header('Authorization')
    //* |-> Validamos si existe el token
    if (!token || token === undefined || token === null) {
        return $response_http(res, {
            status: 401,
            success: false,
            msg: 'Lo sentimos. Peticion no autorizada'
        })
    }
    //* |-> Control de errores tryCatch
    try {
        //* |-> Extraemos el id del token
        const { id_user }: string | any = await jwt.verify(String(token), String(_token_secret_key_))
        //* |-> Buscamos el usuario por el id verificado
        const findUserId: any[] = await db_connect.query("SELECT * FROM users WHERE id_user = ?", [ id_user ])
        //* |-> Extraemos el resultado de la operacion
        const data_user_exist: any[] = findUserId[0]
        //* |-> Si no encuentra ningun resultado retornamo un error 404
        if (data_user_exist.length === 0) {
            return $response_http(res,
                { status: 401, success: false, msg: `El token suministrado no esta indexado con algun usuario existente, peticion rechazada no autorizada` }
            )
        }
        //* |-> Asignamos los valores a las variables globales
        req.user_exist = data_user_exist[0]
        //* |-> Continuamos con el flujo normal
        next()
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Respondemos al cliente
        return $response_http(
            res, 
            { status: 500, success: false, msg: `No podemos completar la validacion del token!`, data: error }
        )
    }
}
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    $$valid_token
}