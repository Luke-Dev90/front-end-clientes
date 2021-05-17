import { Injectable } from '@angular/core';
import { formatDate,DatePipe} from '@angular/common';
import { Clientes } from './clientes';
import {CLIENTES} from './clientes.json'
import {of, Observable ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map,catchError,tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

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
    return this.http.post(this.urlEndPoint,cliente,{headers: this.httpHeaders}).pipe(
      map((response:any) => response.cliente as Clientes),
      catchError(e =>{
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
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        
        if(e.status==400){
          return throwError(e);
        }
        
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }
  
  delete(id:number) : Observable<Clientes>{
    return this.http.delete<Clientes>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e =>{
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }
}
