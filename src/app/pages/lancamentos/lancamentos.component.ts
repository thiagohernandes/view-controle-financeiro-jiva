import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { reject } from 'q';
import { ActivatedRoute, Router } from '@angular/router';
import { LancamentosService } from '../../services/lancamentos.service';
import { DatePipe } from '@angular/common';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { ILancamento } from '../../models/lancamento';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html'
})
export class LancamentosComponent implements OnInit {

  listaLancamentos = [];
  msgErro = [];
  currentLancamento = {
    id: null,
    descricao : null,
    valor : null
  }

  constructor(private _lancamentoService:LancamentosService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.consultaLancamentos();
  }

  consultaLancamentos(){
    this.msgErro = [];
    this._lancamentoService.consultaLancamentos()
                           .subscribe(data => this.listaLancamentos = data,
                                      error => this.msgErro.push(error));
  }

  apagarLancamento(id){
    this._lancamentoService.apagarLancamento(id);
    for(var x =0; x < this.listaLancamentos.length; x++){
      if(this.listaLancamentos[x].id == id){
        this.listaLancamentos.splice(x,1);
        break;
      }
    }
    this.currentLancamento.descricao = null;
    this.currentLancamento.valor = null;
  }

  setCurrentLancamento(lancamento){
    this.currentLancamento.id = lancamento.id;
    this.currentLancamento.descricao = lancamento.descricao;
    this.currentLancamento.valor = lancamento.valor;
  }

}
