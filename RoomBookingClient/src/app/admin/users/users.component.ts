import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { User } from '../../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { FormResetService } from '../../form-reset.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: Array<User>;

  selectedUser!: User;
  action: string;

  message = 'Loading users data ... please wait';
  loadingData = true;
  isAdminUser = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private formResetService: FormResetService,
    private authService: AuthService
  ) {
    this.users = new Array<User>();
  }

  ngOnInit(): void {
    this.loadData();
    this.isAdminUser = this.authService.role === 'ADMIN';

    this.authService.roleSetEvent.subscribe((next) => {
      if (next === 'ADMIN') this.isAdminUser = true;
      else this.isAdminUser = false;
    });
  }

  loadData(): void {
    this.dataService.getUsers().subscribe({
      next: (next) => {
        this.users = next;
        this.loadingData = false;
        this.processUrlParams();
      },
      error: (err) => {
        this.message = 'An error occurred - please contact support.';
      },
    });
  }
  processUrlParams(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.action = params['action'];
      if (id) {
        this.selectedUser =
          this.users.find((user) => user.id === +id) || this.users[0];
      } else {
        this.addUser();
      }
    });
  }

  setUser(id: number): void {
    this.router.navigate(['admin', 'users'], {
      queryParams: { id, action: 'view' },
    });
  }

  addUser() {
    this.selectedUser = new User();
    this.formResetService.resetFormUserEvent.emit(this.selectedUser);
    this.router.navigate(['admin', 'users'], {
      queryParams: { action: 'add' },
    });
  }
}
