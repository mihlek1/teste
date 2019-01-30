import { Pedidos } from "./pedido.interface";
import { Produtos } from "./produto.interface";

export interface ProdutosPedido {
    id:string;
    nome:string;
    pedido:Pedidos;
    produto:Produtos;
    quantidade:number;
    precoUnidade:number;
    precoTotal:number;
 }  