import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { AppComponent } from './app.component';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';
import { LancamentosEditComponent } from './pages/lancamentos-edit/lancamentos-edit.component';

import { LancamentosService } from './services/lancamentos.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GraficoComponent } from './pages/grafico/grafico.component';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr)

const appRoutes: Routes = [
  { path: '', redirectTo: 'app-lancamentos', pathMatch: 'full' },
  { path: 'app-lancamentos', component: LancamentosComponent },
  { path: 'app-lancamentos/:msg', component: LancamentosComponent },
  { path: 'app-lancamentos-edit', component: LancamentosEditComponent },
  { path: 'app-lancamentos-edit/:id', component: LancamentosEditComponent },
  { path: 'app-grafico', component: GraficoComponent },
  { path: '**', component: NotFoundComponent } 
];

@NgModule({
  declarations: [
    AppComponent,
    LancamentosComponent,
    LancamentosEditComponent,
    NotFoundComponent,
    GraficoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    CurrencyMaskModule
  ],
  providers: [
    LancamentosService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
