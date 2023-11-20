/*#####################################*/
//! Imports
import { Router } from "express";
//* |-> Controllers
import { create_users_controller } from "../controllers/users.controllers";
/*#####################################*/
//? -> Configs
const router: Router = Router()
/*#####################################*/
//* $GET
//* $POST
    //* |-> Ruta que creara un usuario
    router.post(
        '/',
        create_users_controller
    )
//* $PUT
//* $DELETE
/*#####################################*/
// TODO -> Exportacion por defecto del modulo
export default router