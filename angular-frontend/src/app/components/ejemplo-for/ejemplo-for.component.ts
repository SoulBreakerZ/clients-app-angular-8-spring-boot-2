import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejemplo-for',
  templateUrl: './ejemplo-for.component.html'
})
export class EjemploForComponent implements OnInit {

  public cursos:string[] = ['TypeScript','JavaScript','Java SE','C#','PHP'];

  constructor() { }

  ngOnInit() {
  }

}
