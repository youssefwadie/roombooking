import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  @Input()
  user!: User;

  constructor() {}

  ngOnInit(): void {}
}
