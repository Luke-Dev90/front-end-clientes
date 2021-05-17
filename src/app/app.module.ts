import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivasComponent } from './directivas/directivas.component';
import { PaginatorComponent } from './paginator/paginator.component'
import { FormComponent } from './clientes/form.component';

import { ClienteService } from './clientes/cliente.service';

import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import { registerLocaleData} from '@angular/common';
import LocaleEs from '@angular/common/locales/es';

registerLocaleData(LocaleEs,'es');

const routes: Routes = [
  {path: '', redirectTo: '/clientes',pathMatch: 'full'},
  {path: 'directivas',component:DirectivasComponent},
  {path: 'clientes', component:ClientesComponent},
  {path: 'clientes/page/:page', component:ClientesComponent},
  {path: 'clientes/form', component:FormComponent},
  {path: 'clientes/form/:id', component:FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ClientesComponent,
    DirectivasComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [ClienteService,{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
