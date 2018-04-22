import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { reject } from 'q';
import { ActivatedRoute, Router } from '@angular/router';
import { LancamentosService } from '../../services/lancamentos.service';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html'
})
export class LancamentosComponent implements OnInit {

  listaLancamentos = [];
  msgErro = [];

  constructor(private _lancamentoService:LancamentosService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.consultaLancamentos();
  }

  consultaLancamentos(){
    this._lancamentoService.consultaLancamentos()
                           .subscribe(data => this.listaLancamentos = data,
                                      error => this.msgErro.push(error));
  }

}
