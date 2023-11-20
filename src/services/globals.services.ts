/*#####################################*/
//! Imports
import { Response, Request } from "express";
import { _response_http } from "../interfaces/interfaces";
/*#####################################*/
//* |-> Servicio que respondera al cliente
const $response_http = (res: Response, data: _response_http) => {
    return res.status(data.status).json({
        success: data.success,
        msg: data.msg,
        data: data.data
    })
}
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    $response_http
}