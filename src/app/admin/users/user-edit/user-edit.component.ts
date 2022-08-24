import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';
import { FormResetService } from '../../../form-reset.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  @Input()
  user: User;

  @Output()
  dataChangedEvent = new EventEmitter<void>();

  formUser: User;

  message: string;

  password: string;

  password2: string;

  nameIsValid = false;

  passwordsMatch = false;
  passwordsAreValid = false;

  resetEventSubscription: Subscription;

  constructor(
    private router: Router,
    private dataService: DataService,
    private formResetService: FormResetService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription =
      this.formResetService.resetFormUserEvent.subscribe((userToEdit) => {
        this.user = userToEdit;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordsAreValid();
  }

  onSubmit(): void {
    this.message = 'Saving...';

    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe({
        next: (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], {
            queryParams: { id: user.id, action: 'view' },
          });
        },
        error: (err) => {
          this.message =
            "Something went wrong and the data wasn't saved. You may want to try again.";
        },
      });
    } else {
      this.dataService.updateUser(this.formUser).subscribe({
        next: (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], {
            queryParams: { id: user.id, action: 'view' },
          });
        },
        error: (error) =>
          (this.message =
            "Something went wrong and the data wasn't saved. You may want to try again."),
      });
    }
  }

  checkIfNameIsValid() {
    if (this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }

  checkIfPasswordsAreValid(): void {
    if (this.formUser.id != null) {
      this.passwordsAreValid = true;
      this.passwordsMatch = true;
    } else {
      if (!this.password || !this.password2) {
        this.passwordsAreValid = false;
        this.passwordsMatch = false;
      } else {
        const password1IsNotBlank = this.password.trim().length !== 0;
        const password2IsNotBlank = this.password2.trim().length !== 0;
        this.passwordsAreValid = password1IsNotBlank && password2IsNotBlank;
        this.passwordsMatch = this.password === this.password2;
      }
    }
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }
}
