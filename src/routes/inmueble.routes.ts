/*#####################################*/
//! Imports
import { Router } from "express";
//* |-> Controllers
import { create_inmueble, delete_inmueble_by_id, update_inmueble_by_id, view_all_inmuebles, view_unique_inmueble_by_id, view_ventas_inmuebles_mes } from "../controllers/inmuebles.controllers";
import { $$valid_token } from "../middlewares/token.middlewares";
import { $$valid_inmuble_by_id } from "../middlewares/inmueble.middlewares";
/*#####################################*/
//? -> Configs
const router: Router = Router()
/*#####################################*/
//* $GET
    //* |-> Ruta que mostrara todos los inmuebles de un usuario
    router.get(
        '/view-all',
        [ $$valid_token ],
        view_all_inmuebles
    )
    //* |-> Ruta que mostrara un inmueble segun su id
    router.get(
        '/view-unique/:id_inmueble',
        [ $$valid_token, $$valid_inmuble_by_id ],
        view_unique_inmueble_by_id
    )
    //* |-> Ruta que mostrara el informe de ventas
    router.get(
        '/view-informe-ventas',
        [ $$valid_token ],
        view_ventas_inmuebles_mes
    )
//* $POST
    //* |-> Ruta que creara un inmueble
    router.post(
        '/create',
        [ $$valid_token ],
        create_inmueble
    )
//* $PUT
    //* |-> Ruta que actualizara un inmueble segun su id
    router.put(
        '/update-unique/:id_inmueble',
        [ $$valid_token, $$valid_inmuble_by_id ],
        update_inmueble_by_id
    )
//* $DELETE
    //* |-> Ruta que eliminara un inmueble segun su id
    router.delete(
        '/delete/:id_inmueble',
        [ $$valid_token, $$valid_inmuble_by_id ],
        delete_inmueble_by_id
    )
/*#####################################*/
// TODO -> Exportacion por defecto del modulo
export default router