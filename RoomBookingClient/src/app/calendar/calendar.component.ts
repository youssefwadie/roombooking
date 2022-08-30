import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  bookings: Array<Booking>;
  selectedDate: string;
  message = '';
  dataLoaded = false;
  isAdminUser = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.bookings = new Array<Booking>();
  }

  ngOnInit(): void {
    this.loadData();
    this.isAdminUser = this.authService.role === 'ADMIN';

    this.authService.roleSetEvent.subscribe((next) => {
      if (next === 'ADMIN') this.isAdminUser = true;
      else this.isAdminUser = false;
    });
  }

  loadData(): void {
    this.message = 'Loading data...';
    this.route.queryParams.subscribe((params) => {
      this.selectedDate = params['date'];
      if (!this.selectedDate) {
        this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
      }
      this.dataService.getBookings(this.selectedDate).subscribe({
        next: (next) => {
          this.bookings = next;
          this.dataLoaded = true;
          this.message = '';
        },
        error: (error) =>
          (this.message = 'Sorry, the data could not be loaded.'),
      });
    });
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {
      queryParams: {
        id,
      },
    });
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number) {
    this.message = 'deleting please wait...';
    this.dataService.deleteBooking(id).subscribe({
      next: (next) => {
        this.message = '';
        this.loadData();
      },
      error: (err) => {
        this.message = 'Sorry, there was a problem deleting the item.';
      },
    });
  }

  dateChanged() {
    this.router.navigate([''], {
      queryParams: {
        date: this.selectedDate,
      },
    });

    console.log(this.selectedDate);
  }
}
