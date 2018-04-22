import { Component, OnInit } from '@angular/core';
import { ILancamento } from '../../models/lancamento';
import { LancamentosService } from '../../services/lancamentos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamentos-edit',
  templateUrl: './lancamentos-edit.component.html'
})
export class LancamentosEditComponent implements OnInit {

  lancamento = {
      id: null,
      vencimento: null,
      descricao: null,
      tipo: null,
      valor: null   
  }
  msgErros = [];
  alterando = false;

  constructor(private _lancamentoService:LancamentosService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.msgErros = [];
    if(this.route.snapshot.params['id'] != null && this.route.snapshot.params['id'] != undefined){
      this.alterando = true;
      this.getLancamento(parseInt(this.route.snapshot.params['id']));
    }
  }

  getLancamento(id){ 
    this._lancamentoService.getLancamento(id)
            .subscribe(res => { 
            this.lancamento.vencimento = this.formatarDataYYYYMMDD(res.vencimento);
            this.lancamento.id = res.id;
            this.lancamento.descricao = res.descricao;
            this.lancamento.valor = res.valor;
            this.lancamento.tipo = res.tipo;
            },
            error => this.msgErros.push(error));
  }

  salvarLancamento(){  
    if(this.montarDados()){ 
      if(!this.alterando){
        this._lancamentoService.salvarLancamento(this.lancamento);
      } else {
        this._lancamentoService.alterarLancamento(this.lancamento);
      }
    }
  }

  montarDados(){ 
    this.msgErros = [];    
    if(this.lancamento.descricao == null || this.lancamento.tipo == null || this.lancamento.valor == null ||
       this.lancamento.vencimento == null){
        this.msgErros.push("Todos os campos são obrigatórios");
      return false;
    } else {
      if(this.lancamento.valor == 0){
        this.msgErros.push("O valor deve ser maior que zero");
        return false;
      }
      return true;
    }
  }

  formatarDataYYYYMMDD(data){ 
    let dFormat = new Date(data);
    let dd = dFormat.getDate();
    let mm = dFormat.getMonth()+1;     
    let yyyy = dFormat.getFullYear();
    let ddS:string;
    let mmS:string;
    if(dd<10){
      ddS ='0'+dd;
    } else {
      ddS = dd.toString();
    }
    if(mm<10){
      mmS ='0'+mm;
    } else{
      mmS = mmS.toString();
    }
    return yyyy+'-'+mmS+'-'+ddS;
  }

}
