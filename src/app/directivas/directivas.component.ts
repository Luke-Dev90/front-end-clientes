import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directivas',
  templateUrl: './directivas.component.html',
  styleUrls: ['./directivas.component.css']
})
export class DirectivasComponent implements OnInit {

  cursos:string[] = ['Java','Angular','spring','css']

  
  constructor() { }

  ngOnInit(): void {
  }

}
