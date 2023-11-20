/*#####################################*/
//! Imports
import jwt from 'jsonwebtoken'
//* |-> Environments
import { _token_secret_key_ } from '../environments/environments'
/*#####################################*/
//* |-> Helper que generara un token de acceso
const generate_jwt = (id_user: string, exp: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload =  { id_user }
        jwt.sign(payload, _token_secret_key_, {
            expiresIn: exp
        }, (err, token) => {
            if (err) reject('false')
            resolve(token || '')
        })
    })
}
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    generate_jwt
}