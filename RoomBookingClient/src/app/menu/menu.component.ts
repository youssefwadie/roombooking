import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  userIsLoggedIn = false;

  ngOnInit(): void {
    this.userIsLoggedIn = this.authService.isAuthenticated;
    this.authService.roleSetEvent.subscribe((next) => {
      if (next !== '') this.userIsLoggedIn = true;
      else this.userIsLoggedIn = false;
    });
  }

  navigateToRoomsAdmin(): void {
    this.router.navigate(['admin', 'rooms']);
  }

  navigateToUsersAdmin(): void {
    this.router.navigate(['admin', 'users']);
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }

  logout(): void {
    this.authService.logout();
    this.navigateToHome();
  }
}
