import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../model/User';
import { Router } from '@angular/router';
import { DataService } from '../../../data.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @Input()
  user!: User;
  edit = false;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

  isAdminUser = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.role === 'ADMIN';
    this.authService.roleSetEvent.subscribe((next) => {
      if (next === 'ADMIN') this.isAdminUser = true;
      else this.isAdminUser = false;
    });
  }

  editUser(): void {
    this.router.navigate(['admin', 'users'], {
      queryParams: { id: this.user.id, action: 'edit' },
    });
  }

  deleteUser(): void {
    this.message = 'deleting...';
    this.dataService.deleteUser(this.user.id).subscribe({
      next: (next) => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'users']);
      },
      error: (err) => {
        this.message = 'Sorry, this user cannot be deleted at this time';
      },
    });
  }

  resetPassword(): void {
    this.message = 'please wait';
    this.dataService.resetUserPassword(this.user.id).subscribe({
      next: (next) => {
        this.message = 'The password has been reset.';
      },
      error: (err) => {
        console.log(err);
        this.message = 'Sorry, something went wrong';
      },
    });
  }
}
