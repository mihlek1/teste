import { Usuarios } from "./usuario.interface";
import { Clientes } from "./cliente.interface";

    
    export interface Pedido {
        razaoSocial:string;
        nomeFantasia:string;
        endereco:string;
        telefone:string;
        CEP:string;
        CNPJ:string;
        formaPagamento:string;
        cidade:string;
        estado:string;
        inscricaoEstadual:string;
        cliente:Clientes;
        vendedor:Usuarios;
        status:string;
    }  