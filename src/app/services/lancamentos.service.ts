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

  _errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Erro no servidor!");
  }

}
