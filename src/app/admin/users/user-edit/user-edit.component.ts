import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from 'src/app/data.service';
import {User} from 'src/app/model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  @Input()
  user: User;

  formUser: User;

  message: string;

  password: string;

  password2: string;

  nameIsValid = false;

  passwordsMatch = false;
  passwordsAreValid = false;

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordsAreValid();
  }

  onSubmit(): void {
    if (this.formUser.id == null) {
      this.dataService
        .addUser(this.formUser, this.password)
        .subscribe((user) => {
          this.router.navigate(['admin', 'users'], {
            queryParams: {id: user.id, action: 'view'},
          });
        });
    } else {
      this.dataService.updateUser(this.formUser).subscribe({
        next: (user) => {
          this.router.navigate(['admin', 'users'], {
            queryParams: {id: user.id, action: 'view'},
          });
        },
        error: (error) => console.log(error),
      });
    }
  }

  checkIfNameIsValid() {
    if (this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }

  checkIfPasswordsAreValid(): void {
    if (this.formUser.id != null) {
      this.passwordsAreValid = true;
      this.passwordsMatch = true;
    } else {
      if (!this.password || !this.password2) {
        this.passwordsAreValid = false;
        this.passwordsMatch = false;
      } else {
        const password1IsNotBlank = this.password.trim().length !== 0;
        const password2IsNotBlank = this.password2.trim().length !== 0;
        this.passwordsAreValid = password1IsNotBlank && password2IsNotBlank;
        this.passwordsMatch = this.password === this.password2;
      }
    }

  }
}
