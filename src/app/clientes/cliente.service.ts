import { Injectable } from '@angular/core';
import { formatDate,DatePipe} from '@angular/common';
import { Clientes } from './clientes';
import {CLIENTES} from './clientes.json'
import {of, Observable ,throwError} from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders,HttpRequest } from '@angular/common/http';
import {map,catchError,tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router'
import { Region } from './region';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) { }

  

  private isNoAutorizado(e):boolean{
    
    if(e.status==401){
     
      if(this.authService.isAuthenticated()){
        this.authService.logout();
      
      }
      this.router.navigate(['/login']);
      return true;
    }
    if(e.status==403){
      swal.fire('Accesso denegado' ,`Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning')
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }
  
  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint+'/regiones').pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getClientes(page:number): Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/' + page).pipe(
      map((response:any) => {      
       (response.content as Clientes[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
        
        return cliente;
        });
        return response;
      })
    );
  }

  create(cliente:Clientes): Observable<Clientes>{
    return this.http.post(this.urlEndPoint,cliente).pipe(
      map((response:any) => response.cliente as Clientes),
      catchError(e =>{

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status==400){
          return throwError(e);
        }
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  // Obtenemos cliente por ID y El observable esta pendiende cuando ingrese un cliente.
  getCliente(id): Observable<Clientes>{
    return this.http.get<Clientes>(`${this.urlEndPoint}/${id}`).pipe(
      //Capturamos el error.
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        
        // router retorna a la vista que deseamos
        this.router.navigate(['/clientes']);
        
        // swal muestra el error con un modal
        swal.fire('Error al editar', e.error.mensaje,'error');
        
        // retorna la exception
        return throwError(e);
      })
    );
  }

  update(cliente:Clientes): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente).pipe(
      catchError(e=>{
        
        //Captura error de autorización login
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status==400){
          return throwError(e);
        }
        
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }
  
  delete(id:number) : Observable<Clientes>{
    return this.http.delete<Clientes>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }

  subirFoto(archivo: File,id) : Observable<HttpEvent<{}>>{
    
    let formData = new FormData();

    formData.append("archivo",archivo);
    formData.append("id",id);

    

    const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`,formData, {
      reportProgress: true
    });
    
    return this.http.request(req).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }



}
