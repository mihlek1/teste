import { Usuarios } from "./usuario.interface";
import { Clientes } from "./cliente.interface";

    
export interface Pedidos {
    id:string;
    dataEmissão:string;
    dataAvaliacao:string;
    dataFinalizada:string;
    formaPagamento:string;
    cliente:Clientes;
    vendedor:Usuarios;
    statusFaturamento:boolean;
    statusVenda:boolean;
    valorTotal:number;
}  