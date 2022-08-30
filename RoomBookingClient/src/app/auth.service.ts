import { EventEmitter, Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();

  constructor(private dataService: DataService) {}

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe({
      next: (next) => {
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error: (err) => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      },
    });
  }

  getRole(): string | undefined {
    // if (this.jwtToken == null) return undefined;
    // const encodedPayload = this.jwtToken.split('.')[1];
    // const payload = window.atob(encodedPayload);
    // return JSON.parse(payload).role;
    return 'ADMIN';
  }
}
