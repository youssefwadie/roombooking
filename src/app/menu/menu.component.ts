import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  navigateToRoomsAdmin(): void {
    this.router.navigate(['admin', 'rooms']);
  }

  navigateToUsersAdmin(): void {
    this.router.navigate(['admin', 'users']);
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }
}
