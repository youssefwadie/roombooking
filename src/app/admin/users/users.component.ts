import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {User} from '../../model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {FormResetService} from "../../form-reset.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DataService],
})
export class UsersComponent implements OnInit {
  users: Array<User>;

  selectedUser!: User;
  action: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private formResetService: FormResetService
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
      } else {
        this.addUser();
      }
    });
  }

  setUser(id: number): void {
    this.router.navigate(['admin', 'users'], {
      queryParams: {id, action: 'view'},
    });
  }

  addUser() {
    this.selectedUser = new User();
    this.formResetService.resetFormUserEvent.emit(this.selectedUser);
    this.router.navigate(['admin', 'users'], {
      queryParams: {action: 'add'},
    });
  }
}
