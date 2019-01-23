import { Injectable } from '@angular/core';
import { Pedidos } from '../../interfaces/pedido.interface';


@Injectable()

//Provedor utilizado para realizar a transferência dados de página para página
export class ParametrosDetalhesProvider {

  private pedido:Pedidos;

  constructor() {


  }

  setPedido(pedido) {

    this.pedido = pedido;

  }

  getPedido() {

    return this.pedido;

  }

}
