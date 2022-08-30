import { EventEmitter, Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  role: string;
  constructor(private dataService: DataService) {}

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe({
      next: (next) => {
        this.setupRole();
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error: (err) => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      },
    });
  }

  setupRole(): void {
    this.dataService.getRole().subscribe({
      next: (next) => {
        this.role = next.role;
      },
    });
  }
}
