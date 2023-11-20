/*#####################################*/
//* |-> Interface Users create
interface _users_c {
    name: string;
    email: string;
    password: string;
}
//* |-> Interface Response HTTP
interface _response_http {
    status: number;
    success: boolean;
    msg: string;
    data?: any
}
//* |-> Interface Login user
interface _login_user {
    email: string;
    password: string;
}
//* |-> Interface Inmueble create
interface _inmueble_c {
    id_user: string;
    name_inmueble: string;
    description: string;
    address: string;
    lon: number;
    lat: number;
    price: number;
}
/*#####################################*/
// TODO -> Exportacion del modulo
export {
    _users_c,
    _response_http,
    _login_user,
    _inmueble_c
}