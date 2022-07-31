import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DataService]
})
export class UsersComponent implements OnInit {
  users: Array<User>;

  selectedUser!: User;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.users = dataService.users;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.selectedUser = this.users.find(user => user.id === +id) || this.users[0];
      }
    });
  }


  setUser(id: number): void {
    this.router.navigate(['admin', 'users'], {queryParams: {id}});
  }
}
