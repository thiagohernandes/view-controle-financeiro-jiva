import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ILancamento } from '../models/lancamento';

@Injectable()
export class LancamentosService {

  private _lancamentos:Array<Object>;
  private _url_base:string = "http://localhost:8080/controle-financeiro-jiva/rest/lancamentos";

  constructor(private http:HttpClient, private router: Router) { 
  }

  consultaLancamentos():Observable<ILancamento[]>{
    return this.http.get<ILancamento[]>(this._url_base+'/todos')
                    .catch(this._errorHandler);
  }

  getLancamento(id):Observable<ILancamento>{
    return this.http.get<ILancamento>(this._url_base+'/'+id)
                    .catch(this._errorHandler);
  }

  salvarLancamento(lancamento){ 
    return this.http.post(this._url_base+'/novo', lancamento)
    .catch(this._errorHandlerRedirect)
    .subscribe(res => {this.router.navigate(['/app-lancamentos','Sucesso na gravação']);}); 
  }

  alterarLancamento(lancamento){ 
    return this.http.put(this._url_base+'/alterar/', lancamento)
    .catch(this._errorHandlerRedirect)
    .subscribe(res => {this.router.navigate(['/app-lancamentos','Sucesso na alteração']);}); 
  }

  apagarLancamento(id) {
    return this.http.delete(this._url_base+"/excluir/"+id)
    .catch(this._errorHandlerRedirect)
    .subscribe(res => {console.log(res);this.router.navigate(['/app-lancamentos','Sucesso na exclusão'])}); 
  }

  _errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Erro no servidor!");
  }

  _errorHandlerRedirect(error:HttpErrorResponse){
    return this.router.navigate(['/app-lancamentos',error.message || "Erro no servidor!"]);
  }

}
