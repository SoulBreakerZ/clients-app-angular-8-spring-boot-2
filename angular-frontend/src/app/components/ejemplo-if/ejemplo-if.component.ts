import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejemplo-if',
  templateUrl: './ejemplo-if.component.html'
})
export class EjemploIfComponent implements OnInit {

  public cursos:string[] = ['TypeScript','JavaScript','Java SE','C#','PHP'];
  public enable:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  public setEnable():void{
    this.enable= !this.enable;
  }

}
