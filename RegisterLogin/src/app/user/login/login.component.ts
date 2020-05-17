import { VirgilService } from './../../shared/virgil.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel = {
    Username: '',
    Password: ''
  };

  constructor(private service: UserService, private router: Router, private toastr: ToastrService, private virgil: VirgilService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/home']);

    }
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.virgil.initializeVirgil(res.token);
          this.router.navigateByUrl('/home');
        }
      },
      err => {
        if (err.status === 400) {
          this.toastr.error('Incorrect Username or Password', 'Authentication Failed');
        } else {
          this.toastr.warning('Server is not Connected', 'Error Caused');
        }
      }
    );
  }


  tokenPromise(token: string) {
    return () => Promise.resolve(token);
  }

}
