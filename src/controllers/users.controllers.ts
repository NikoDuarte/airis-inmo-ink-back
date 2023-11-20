/*#####################################*/
//! Imports
import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
//* |-> Interfaces
import { _users_c } from "../interfaces/interfaces";
import { $response_http } from "../services/globals.services";
import { db_connect } from "../database/conection.database";
/*#####################################*/
//* |-> Controlador que creara un usuario
const create_users_controller = async(req: Request, res: Response) => {
    //* |-> Capturamos la data enviada
    const body_user: _users_c = req.body
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscamos el usuario por el email
        const findUserEmail: any[] = await db_connect.query(`SELECT * FROM users WHERE email = ?`, [ body_user.email ])
        //* |-> Si existe un usuario por el email suministrado retornamos 400
        if (findUserEmail[0].length !== 0) {
            return $response_http(
                res,
                { status: 404, success: false, msg: `Lo sentimos, el usuario con correo ${ body_user.email } ya existe en nuestro sistema!` }
            )
        }
        //* |-> Codificamos la contraseña del usuario
        const genSalt = bcrypt.genSaltSync()
        const hashPassword = bcrypt.hashSync(body_user.password, genSalt)
        //* |-> Insertamos el usuario
        const new_user = await db_connect.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [body_user.name, body_user.email, hashPassword])
        //* |-> Respondemos al cliente un mensaje de exito
        return $response_http(
            res,
            { status: 200, success: true, msg: `Se creo correctamente el usuario ${ body_user.name }`, data: new_user[0] }
        )
    } catch (error) {
        //! Imprimimos el error 
        console.log(error);
        //! Respondemos al cliente
        return $response_http(res, { status: 500, success: false, msg: 'No podemos completar la creacion del usuario, presentamos un error grave!', data: error })
    }
}
/*#####################################*/
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    create_users_controller
}