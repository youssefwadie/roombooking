import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Booking} from "../model/Booking";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;
  selectedDate: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.bookings = new Array<Booking>();
  }

  // selectedDate = new Date();

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedDate = params['date'];
      if (!this.selectedDate) {
        this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
      }
      this.dataService.getBookings(this.selectedDate).subscribe(bookings => this.bookings = bookings);
    });

  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'],
      {
        queryParams: {
          id
        }
      });
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number) {
    this.dataService.deleteBooking(id);
  }

  dateChanged() {
    this.router.navigate([''], {
      queryParams: {
        date: this.selectedDate
      }
    });

    console.log(this.selectedDate);
  }
}
