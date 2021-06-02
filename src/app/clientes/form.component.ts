import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Clientes } from './clientes';
import { Router,ActivatedRoute } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import swal from 'sweetalert2'
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

  cliente:Clientes = new Clientes();
  titulo: string = "Crear Cliente";  
  
  errores :string[];

  constructor(private clienteService: ClienteService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }
    regiones: Region[];
  ngOnInit() {
    this.cargarCliente();
    this.cargarRegiones();
  }
  
  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente
          )
      }
    })
  }
  cargarRegiones():void{
    this.clienteService.getRegiones().subscribe(regiones =>{
      this.regiones = regiones;
    })
  }


  create():void{
    this.clienteService.create(this.cliente)
    .subscribe( cliente => {

        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `El Cliente: ${cliente.nombre} ha sido creado con exito`,'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errrors);
      }
      );
  }

  update():void{
    
    this.clienteService.update(this.cliente)
    .subscribe(
      json => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado',`${json.mensaje}:${json.cliente.nombre}`,'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend' + err.status);
        console.error(err.error.errors);
      }
    )
  }

  compararRegion(o1:Region,o2:Region):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    } 
    return o1 == null || o2== null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }

}
