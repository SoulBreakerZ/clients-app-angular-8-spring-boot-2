import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  initServices(nombre:string){

  }

  items: any[] = [
    {name:'Clients JSON DATA',link:'/clients-json-data'},
    {name:'Clients HTTP REQUEST',link:'/clients'},
    {name:'Clients HTTP REQUEST With pagination',link:'/clients-page'}
  ];
 


}
