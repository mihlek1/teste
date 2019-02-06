import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


//Provedor utilizado para realizar a transferência dados de página para página
@Injectable()
export class ParametrosDetalhesProvider {

  private pedido:string;
  private produto:string;
  private pProdutos:string;
  private nomeProduto:string;
  private valorTotalPedido:number;
  private clientePedido:any;
  constructor(
    private db: AngularFirestore
  ) {

    this.valorTotalPedido = 0;

  }

  setPedido(pedido:string) {
    this.pedido = pedido;
  }

  getPedido() {
    return this.pedido;
  }

  setProduto(produto:string) {
    this.produto = produto;
  }

  getProduto() {
    return this.produto;
  }

  setpProdutos(pProdutos:string) {
    this.pProdutos = pProdutos;
  }

  getpProdutos() {
    return this.pProdutos;
  }

  setProdutoNome(produto:string) {
    this.nomeProduto = produto;
  }

  getProdutoNome() {
    return this.nomeProduto;
  }

  //A cada vez que um produto é adicionado esse valor aumenta
  addValorPedido(valor:number) {
    this.valorTotalPedido = this.valorTotalPedido + valor;
  }
  //A cada vez que um produto é removido esse valor diminui
  removeValorPedido(valor:number) {
    this.valorTotalPedido = this.valorTotalPedido - valor;
  }
  //Retorna o valor para inserir na collection de pedidos
  getValorPedido() {
    return this.valorTotalPedido;
  }
  setValorPedido(valor:number) {
    this.valorTotalPedido = valor;
  }
  setCliente(cliente:any) {
    this.clientePedido = cliente;
  }
  getCliente() {
    return this.clientePedido;
  }

  generateRandomId() {
    let id = this.db.createId();
    return id;
  }
}
