import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  message = '';
  name: string;
  password: string;

  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.authenticationResultEvent.subscribe(
      (result) => {
        if (result) {
          const url = this.activatedRoute.snapshot.queryParams['requested'];
          this.router.navigateByUrl(url);
        } else {
          this.message =
            'Your username or password was not recognised - try again.';
        }
      }
    );
  }

  onSubmit(): void {
    this.authService.authenticate(this.name, this.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
