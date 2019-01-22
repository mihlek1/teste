import { Usuarios } from "./usuario.interface";
import { Clientes } from "./cliente.interface";

    
export interface Pedido {
    dataEmissão:string;
    dataAvaliacao:string;
    formaPagamento:string;
    cliente:Clientes;
    vendedor:Usuarios;
    status:string;
}  