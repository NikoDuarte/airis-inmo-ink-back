/*#####################################*/
//! Imports
import { Router } from "express";
//* |-> Controllers
import { auth_user, renew_token_auth } from "../controllers/auth.controllers";
import { $$valid_token } from "../middlewares/token.middlewares";
/*#####################################*/
//? -> Configs
const router: Router = Router()
/*#####################################*/
//* $GET
//* $POST
    //* |-> Ruta que autentificara un usuario
    router.post(
        '/login',
        auth_user
    )
//* $PUT
//* $PATCH
    //* |-> Ruta que renovara un token de acceso
    router.patch(
        '/renew-token',
        [ $$valid_token ],
        renew_token_auth
    )
//* $DELETE
/*#####################################*/
// TODO -> Exportacion por defecto del modulo
export default router