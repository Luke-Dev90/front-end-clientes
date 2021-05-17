import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import {Clientes} from './clientes';
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./cliente.component.css']
  
})
export class ClientesComponent implements OnInit {

  clientes:Clientes[];
  paginador: any;
  
  
  constructor(private clientesService:ClienteService,
    private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    // ESTO SIRVE PARA LA PAGINACION
    this.activedRoute.paramMap.subscribe( params => {
    
      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }
        // Forma clasica de listar sinpaginacion PD: esta combinada ahora con paginacion
      this.clientesService.getClientes(page).subscribe(response => {
         this.clientes= response.content as Clientes[];
         this.paginador = response;
        });
      }
    );

  }

  delete(cliente: Clientes):void{
    swal.fire({
      title: 'ATENCION ESTA POR ELIMINAR UN CLIENTE',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) { 
        this.clientesService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire(
              'Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito`,
              'success'
            )
          }
        )
      }
    })    
  }



}
