import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Clientes } from './clientes';
import { Router,ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

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

  ngOnInit(): void {
    this.cargarCliente()
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

}
