import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }
  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          console.log('Success');
          this.service.formModel.reset();
          this.toastr.success('New User has been created', 'Registration Successfull');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUsername':
                this.toastr.error('Username is already taken', 'Registration Failed');
                break;

              default:
                this.toastr.error(element.description, 'Registration Failed');
                break;
            }
          })
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
