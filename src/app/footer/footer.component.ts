import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./foot.component.css']
})
export class FooterComponent implements OnInit {

  public autor:any = {nombre:'lucas',apellido:'chalela'}
  constructor() { }

  ngOnInit(): void {
  }

}
