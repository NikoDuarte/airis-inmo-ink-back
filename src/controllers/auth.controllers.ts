/*#####################################*/
//! Imports
import { Request, Response } from "express";
//* |-> Servicios
import { $response_http } from "../services/globals.services";
//* |-> Interfaces
import { _login_user } from "../interfaces/interfaces";
import { db_connect } from "../database/conection.database";
import bcrypt from 'bcryptjs';
import { generate_jwt } from "../helpers/token.helpers";
/*#####################################*/
//* |-> Controlador que autenticara un usuario
const auth_user = async (req: Request, res: Response) => {
    //* |-> Capturamos la data enviada
    const userData: _login_user = req.body;
    //* |-> Control de errores TryCatch
    try {
        //* |-> Buscamos el usuario por el email suministrado
        const findUserEmail: any[] = await db_connect.query("SELECT * FROM users WHERE email = ?", [ userData.email ])
        const data_user_exist: any[] = findUserEmail[0]
        //* |-> Si no encuentra ningun resultado retornamos 404
        if (data_user_exist.length === 0) {
            return $response_http(
                res,
                { status: 404, success: false, msg: `No es posible encontrar el usuario con los datos suministrados!` }
            )
        }
        //* |-> Comprobamos las contraseñas
        const valid_password: boolean = bcrypt.compareSync(userData.password, data_user_exist[0].password)
        //* |-> Si no es valida retornamos 404
        if (!valid_password) {
            return $response_http(
                res,
                { status: 404, success: false, msg: `No es posible encontrar el usuario con los datos suministrados!` }
            )
        }
        //* |-> Generareos un token de acceso
        const token_access = await generate_jwt(data_user_exist[0].id_user, '1h')
        //* |-> Retornamos al usuario el acceso token
        return $response_http(
            res,
            { status: 200, success: true, msg: `Bienvenido ${data_user_exist[0].name}`, data: token_access }
        )
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Retornamos un error al usuario
        return $response_http(
            res,
            { status: 500, success: false, msg: `No podemos completar la autentificacion del usuario ${userData.email} ya que se presento un error en nuestro sistema`, data: error }
        );
    }
}
//* |-> Controlador que renovara el token
const renew_token_auth = async (req: Request | any, res: Response) => {
    //* |-> Capturamos el usuario existente
    const { user_exist } = req
    //* |-> Control de errores tryCatch
    try {
        //* |-> Renovamos el token
        const renew_token: string = await generate_jwt(user_exist.id_user, '10h')
        //* |-> Eliminamos del objeto la propiedad password
        delete user_exist['password']
        //* |-> Retornamos al cliente 200
        return $response_http(
            res,
            { status: 200, success: true, msg: `Renovacion de token exitosa para el usuario ${user_exist.name}`, data: { token: renew_token, user_info: user_exist } }
        )
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Respondemos al usuario
        return $response_http(
            res,
            { status: 500, success: false, msg: `No podemos continuar con la regeneracion del token para el usuario ${user_exist.name}` }
        )
    }
}
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    auth_user,
    renew_token_auth
}