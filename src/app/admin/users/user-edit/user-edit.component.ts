import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

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

  constructor(private dataSerivce: DataService, private router: Router) {}

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
  }

  onSubmit(): void {
    if (this.formUser.id == null) {
      this.dataSerivce
        .addUser(this.formUser, this.password)
        .subscribe((user) => {
          this.router.navigate(['admin', 'users'], {
            queryParams: { id: user.id, action: 'view' },
          });
        });
        
    } else {
      this.dataSerivce.updateUser(this.formUser).subscribe({
        next: (user) => {
          this.router.navigate(['admin', 'users'], {
            queryParams: { id: user.id, action: 'view' },
          });
        },
        error: (error) => console.log(error),
      });
    }
  }
}
