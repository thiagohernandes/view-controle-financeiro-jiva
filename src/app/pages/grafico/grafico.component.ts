import { Component, OnInit, AfterViewInit  } from '@angular/core';
import * as Chart from 'chart.js';
import { LancamentosService } from '../../services/lancamentos.service';
import { ILancamento } from '../../models/lancamento';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html'
})
export class GraficoComponent implements AfterViewInit,OnInit {

  canvas: any;
  ctx: any;
  listaLancamentos = [];
  msgErro = [];
  labelsGrafico = ['Receitas R$ ','Despesas R$ '];
  dadosGrafico = [];
  sumReceita:number = 0;
  sumDespesa:number = 0;

  constructor(private _lancamentoService:LancamentosService) { 
  }

  ngOnInit(){
    this.montarLabels();
  }

  montarLabels(){
    this._lancamentoService.consultaLancamentos()
                           .subscribe(data => {
                            this.listaLancamentos = data;
                            for(let x = 0; x < this.listaLancamentos.length; x++){ 
                               if(this.listaLancamentos[x].tipo == 'R'){
                                  this.sumReceita+=this.listaLancamentos[x].valor;
                               } else {
                                  this.sumDespesa+=this.listaLancamentos[x].valor;
                               }
                            }
                            this.dadosGrafico.push(this.sumReceita.toFixed(2));
                            this.dadosGrafico.push(this.sumDespesa.toFixed(2));
                            this.preencherGrafico();
                            },
                            error => this.msgErro.push(error));
    
  }

  preencherGrafico(){   
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.labelsGrafico,
          datasets: [{
              label: '',
              data: this.dadosGrafico,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
  }
  
  ngAfterViewInit(){

  }

}