/*#####################################*/
//! Imports
import { Request, Response } from "express";
//* |-> Services
import { $response_http } from "../services/globals.services";
//* |-> Interfaces
import { _inmueble_c } from "../interfaces/interfaces";
import { db_connect } from "../database/conection.database";
/*#####################################*/
//* |-> Controlador que mostrara todos los inmuebles de un usuario
const view_all_inmuebles = async (req: Request, res: Response) => {
    //* |-> Capturamos el usuario
    const { user_exist }: any = req
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscamos todos los inmuebles de x usuario
        const view_all_inmuebles: any[] = await db_connect.query(
            "SELECT * FROM inmueble WHERE id_user = ?",
            [user_exist.id_user]
        )
        //* |-> Extraemos la data existente
        const inmuebles_exist: any[] = view_all_inmuebles[0]
        //* |-> Si no tiene ningun contenido retornamos 404
        if (inmuebles_exist.length === 0) {
            return $response_http(res, {
                status: 404,
                success: false,
                msg: 'No encontramos ningun inmueble inscrito!'
            });
        }
        //* |-> Retornamos al usuario un mensaje de exito
        return $response_http(
            res,
            { status: 200, success: false, msg: `Busqueda exitosa`, data: inmuebles_exist }
        )
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Respondemos al cliente
        return $response_http(
            res,
            { status: 500, success: false, msg: `No podemos completar la visualizacion de los inmuebles`, data: error }
        )
    }
}
//* |-> Controlador que mostrara un inmueble segun su id
const view_unique_inmueble_by_id = async (req: Request, res: Response) => {
    //* |-> Capturamos el usuario
    const { inmueble_data }: any = req
    //* |-> Control de errores tryCatch
    try {
        //* |-> Retornamos al usuario un mensaje de exito
        return $response_http(
            res,
            { status: 200, success: false, msg: `Busqueda exitosa`, data: inmueble_data }
        )
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Respondemos al cliente
        return $response_http(
            res,
            { status: 500, success: false, msg: `No podemos completar la visualizacion del inmueble`, data: error }
        )
    }
}
//* |-> Controlador que mostrara las ventas de los inmuebles
const view_ventas_inmuebles_mes = async (req: Request, res: Response) => {
    //* |-> Capturamos el usuario
    const { user_exist }: any = req
    //* |-> Control de errores tryCatch
    try {
        //* |-> realizamos la consulta basados en los inmuebles del usuario
        const view_all_ventas_mounth: any[] = await db_connect.query(
            `
            SELECT 
                MONTH(date_register) AS mes_numero,
                MONTHNAME(date_register) AS mes_nombre,
                COUNT(*) AS total_inmuebles_mes,
                SUM(CASE WHEN id_user = ? THEN 1 ELSE 0 END) AS total_inmuebles_usuario,
                SUM(CASE WHEN id_user = ? THEN price ELSE 0 END) AS suma_precios_usuario
            FROM inmueble
            WHERE id_user = ?
            GROUP BY mes_numero, mes_nombre
            ORDER BY mes_numero;
            `,
            [user_exist.id_user, user_exist.id_user, user_exist.id_user]
        )
        //* |-> Capturamos los datos resultantes
        const ventas_exist: any[] = view_all_ventas_mounth[0]
        //* |-> Si no encuentra ningun registro retornamos 404
        if (ventas_exist.length === 0) {
            return $response_http(
                res,
                { status: 404, success: false, msg: 'No se encontro ningun inmueble registrado para el informe de ventas' }
            )
        }
        //* |-> Respondemos al cliente un exito 200
        return $response_http(
            res,
            { status: 200, success: true, msg: `Busqueda exitosa!`, data: ventas_exist }
        )
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Respondemos al cliente
        return $response_http(
            res,
            { status: 500, success: false, msg: `No podemos completar la consulta de ventas de inmuebles`, data: error }
        )
    }
}
//* |-> Controlador que creara un inmueble
const create_inmueble = async (req: Request, res: Response) => {
    //* |-> Capturamos la data
    const body_inmueble: _inmueble_c = req.body
    //* |-> Capturamos el usuario
    const { user_exist }: any = req
    //* |-> Control de errores tryCatch
    try {
        //* |-> Hacemos la insercion del nuevo inmueble
        const new_inmueble = await db_connect.query(
            "INSERT INTO inmueble (id_user, name_inmueble, description, address, lon, lat, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [user_exist.id_user, body_inmueble.name_inmueble, body_inmueble.description, body_inmueble.address, body_inmueble.lon, body_inmueble.lat, body_inmueble.price]
        )
        //* |-> Respondemos al cliente un mensaje de exito 200
        return $response_http(
            res,
            { status: 200, success: true, msg: `Se creo correctamente el inmueble ${body_inmueble.name_inmueble}`, data: new_inmueble }
        )
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Respondemos al cliente
        return $response_http(
            res,
            { status: 500, success: false, msg: `No podemos completar el registro del inmueble`, data: error }
        )
    }
}
//* |-> Controlador que actualizara un inmueble
const update_inmueble_by_id = async (req: Request, res: Response) => {
    //* |-> Capturamos el inmueble y usuario existente
    const { user_exist, inmueble_data }: any = req
    //* |-> Capturamos el cuerpo a editar
    const body_update: _inmueble_c = req.body;
    //* |-> Control de errores tryCatch
    try {
        //* |-> Validamos que el usuario sea el dueño del inmueble
        if (user_exist.id_user !== inmueble_data.id_user) {
            //* |-> Si son diferentes retornamos 401
            return $response_http(res, {
                status: 401, success: false, msg: 'No puedes modificar este documento'
            })
        }
        //* |-> Realizamos la actualizacion del documento
        const update_inmueble = await db_connect.query(
            "UPDATE inmueble SET name_inmueble = ?, description = ?, address = ?, lon = ?, lat = ?, price = ? WHERE id_inmueble = ?",
            [
                body_update.name_inmueble ? body_update.name_inmueble : inmueble_data.name_inmueble,
                body_update.description ? body_update.description : inmueble_data.description,
                body_update.address ? body_update.address : inmueble_data.address,
                body_update.lon ? body_update.lon : inmueble_data.lon,
                body_update.lat ? body_update.lat : inmueble_data.lat,
                body_update.price ? body_update.price : inmueble_data.price,
                inmueble_data.id_inmueble
            ]
        )
        //* |-> Respondemos al cliente un mensaje de exito 200
        return $response_http(
            res,
            {
                status: 200, success: true, msg: `Se actualizo correctamente la propiaded ${body_update.name_inmueble ? body_update.name_inmueble : inmueble_data.name_inmueble}`
            }
        )
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Respondemos al cliente
        return $response_http(
            res,
            { status: 500, success: false, msg: `No podemos completar la actualizacion del inmueble`, data: error }
        )
    }
}
//* |-> Controlador que eliminara un inmueble por su id
const delete_inmueble_by_id = async (req: Request, res: Response) => {
    //* |-> Capturamos el inmueble y usuario existente
    const { user_exist, inmueble_data }: any = req
    //* |-> Control de errores tryCatch
    try {
        //* |-> Validamos que el usuario sea el dueño del inmueble
        if (user_exist.id_user !== inmueble_data.id_user) {
            //* |-> Si son diferentes retornamos 401
            return $response_http(res, {
                status: 401, success: false, msg: 'No puedes modificar este documento'
            })
        }
        //* |-> Ejecutamos la consulta de eliminacion por id del inmueble
        const delete_inmueble = await db_connect.query(
            "DELETE FROM inmueble WHERE id_inmueble = ?",
            [inmueble_data.id_inmueble]
        )
        //* |-> Respondemos al cliente un mensaje de exito 200
        return $response_http(
            res,
            { status: 200, success: true, msg: `Se elimino correctamente el inmueble ${inmueble_data.name_inmueble}` }
        )
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Respondemos al cliente
        return $response_http(
            res,
            { status: 500, success: false, msg: `No podemos completar la eliminacion del inmueble`, data: error }
        )
    }
}
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    create_inmueble,
    view_all_inmuebles,
    view_unique_inmueble_by_id,
    update_inmueble_by_id,
    delete_inmueble_by_id,
    view_ventas_inmuebles_mes
}
