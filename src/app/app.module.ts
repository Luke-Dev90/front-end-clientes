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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import { registerLocaleData} from '@angular/common';
import LocaleEs from '@angular/common/locales/es';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule}from '@angular/material/core';
import { DetalleComponent } from './clientes/detalle/detalle.component'
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import {TokenInterceptor} from './usuarios/intercepts/token.interceptor';

registerLocaleData(LocaleEs,'es');

const routes: Routes = [
  {path: '', redirectTo: '/clientes',pathMatch: 'full'},
  {path: 'directivas',component:DirectivasComponent},
  {path: 'clientes', component:ClientesComponent},
  {path: 'clientes/page/:page', component:ClientesComponent},
  {path: 'clientes/form', component:FormComponent,canActivate:[AuthGuard,RoleGuard],data: {role:'ROLE_ADMIN'}},
  {path: 'clientes/form/:id', component:FormComponent, canActivate:[AuthGuard,RoleGuard],data: {role:'ROLE_ADMIN'}},
  {path: 'modal', component:DetalleComponent},
  {path: 'login', component:LoginComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ClientesComponent,
    DirectivasComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule
  ],
  providers: [ClienteService,
    {provide: LOCALE_ID, useValue: 'es'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi:true},],
  bootstrap: [AppComponent],
  exports: [ MatDatepickerModule, 
    MatNativeDateModule ]
})
export class AppModule { }
