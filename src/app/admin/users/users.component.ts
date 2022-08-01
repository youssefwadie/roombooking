import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { User } from '../../model/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DataService],
})
export class UsersComponent implements OnInit {
  users: Array<User>;

  selectedUser!: User;
  action!: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.users = new Array<User>();
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((next) => (this.users = next));

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.action = params['action'];
      if (id) {
        this.selectedUser =
          this.users.find((user) => user.id === +id) || this.users[0];
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
    this.router.navigate(['admin', 'users'], {
      queryParams: { action: 'add' },
    });
  }
}
