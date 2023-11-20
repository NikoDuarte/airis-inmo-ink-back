/*#####################################*/
//! Imports
import { Request, Response, NextFunction } from "express";
import { db_connect } from "../database/conection.database";
import { $response_http } from "../services/globals.services";
/*#####################################*/
//* |-> Middleware que validara la existencia de un inmueble por su id
const $$valid_inmuble_by_id = async (req: Request | any, res: Response, next: NextFunction) => {
    //* |-> Capturamos el id del inmueble por los parametros
    const { id_inmueble }: string | any = req.params
    //* |-> Control de errores tryCatch
    try {
        //* |-> Validamos que existe la variable
        if (!id_inmueble || id_inmueble === null || id_inmueble === undefined) {
            return $response_http(
                res,
                { status: 400, success: false, msg: 'Indice busqueda de inmueble no suministrado' }
            )
        }
        //* |-> Buscamos el inmueble por el id suministrado
        const findInmuebleId: any[] = await db_connect.query("SELECT * FROM inmueble WHERE id_inmueble = ?", [id_inmueble])
        //* |-> Extraemos el resultado existente
        const inmueble_exist: any[] = findInmuebleId[0]
        //* |-> Si no retorna ningun documento asociado retornamos 404
        if (inmueble_exist.length === 0) {
            return $response_http(
                res,
                { status: 400, success: false, msg: `No se encontro ningun documento relacionado al indice suministrado: ${id_inmueble}` }
            )
        }
        //* |-> Sumistraremos el documento en la request
        req.inmueble_data = inmueble_exist[0]
        //* |-> Continuamos la funcionalidad
        next()
    } catch (error) {
        //! Imprimimos el error
        console.log(error);
        //! Respondemos al cliente
        return $response_http(
            res,
            { status: 500, success: false, msg: `No podemos completar la busqueda del inmueble existente!`, data: error }
        )
    }
}
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    $$valid_inmuble_by_id
}