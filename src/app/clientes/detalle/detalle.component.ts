import { Component, OnInit,Input } from '@angular/core';
import { Clientes } from '../clientes';
import { ClienteService } from '../cliente.service';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ModalService } from './modal.service';
import { AuthService } from '../../usuarios/auth.service';



@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit {
  
  @Input() cliente: Clientes;
  titulo:string = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso: number= 0;
  
  constructor(public clienteService: ClienteService,
    public modalService: ModalService,
    public authService: AuthService ) { 
    
  }
    
  ngOnInit(): void {
    
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error Seleccionar imagen','El archivo debe ser del tipo image','error')
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){

    if(!this.fotoSeleccionada){
      Swal.fire('Error Upload','Debe seleccionar una foto','error');
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded / event.total)*100);
        }else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.cliente = response.cliente as Clientes;

          this.modalService.notificarUpload.emit(this.cliente);
          Swal.fire('La foto se ha subido correctamente!', response.mensaje,'success');
        }
        //this.cliente = cliente;
        
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
