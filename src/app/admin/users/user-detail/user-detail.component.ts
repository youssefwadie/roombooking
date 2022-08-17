import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {Router} from '@angular/router';
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @Input()
  user!: User;
  edit = false;

  constructor(private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  editUser(): void {
    this.router.navigate(['admin', 'users'], {
      queryParams: {id: this.user.id, action: 'edit'},
    });
  }


  deleteUser(): void {
    this.dataService.deleteUser(this.user.id).subscribe(
      next => {
        this.router.navigate(['admin', 'users']);
      }
    );
  }

  resetPassword(): void {
    this.dataService.resetUserPassword(this.user.id);
  }

}
