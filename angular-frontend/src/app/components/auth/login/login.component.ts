import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Please, Sign in!";

  user: User;

  constructor(private toastrService: ToastrService, private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/clients-page']);
      this.toastrService.info(`Hello ${this.authService.user.username},you are already authenticated`, 'Login');
    }
  }

  login(): void {

    if (this.user.username == null || this.user.passwd == null) {
      this.toastrService.info('Username or password empty');
      return;
    }

    this.authService.login(this.user).subscribe(response => {
      console.log(response);
      //const payload = JSON.parse(atob(response.access_token.split(".")[1]));
      //console.log(payload);
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      let user = this.authService.user;
      console.log(user);
      this.router.navigate(['/clients-page']);
      this.toastrService.info(`Welcome ${user.username},You have successfully authentification`, 'Login');
    }, err => {
      if (err.status == 400) {
        this.toastrService.error(`User or password incorrect!`, 'Login');
      }
    });
  }

}
