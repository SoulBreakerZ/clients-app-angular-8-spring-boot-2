import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private toastrService: ToastrService, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {}


  initServices(nombre:string){

  }

  items: any[] = [
    {name:'Clients JSON DATA',link:'/clients-json-data'},
    {name:'Clients HTTP REQUEST',link:'/clients'},
    {name:'Clients HTTP REQUEST With pagination',link:'/clients-page'}
  ];
 

  logout():void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.toastrService.info('Your session han been closed with success.', 'Close session')
  }

}
