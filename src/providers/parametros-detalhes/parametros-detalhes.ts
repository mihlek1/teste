import { Injectable } from '@angular/core';


@Injectable()
export class ParametrosDetalhesProvider {


  private data;


  constructor() {
  }

  //recebe os dados da listagemCliente e envia para os detalhes
  setClienteData(data) {
    this.data = data;
  }
  
  getClienteData() {
    return this.data;
  }

}
