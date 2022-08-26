import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { DataService } from '../../data.service';
import { Booking } from '../../model/Booking';
import { Layout, Room } from '../../model/Room';
import { User } from '../../model/User';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css'],
})
export class EditBookingComponent implements OnInit {
  booking: Booking;
  rooms: Array<Room>;
  users: Array<User>;

  layouts: string[] = Object.keys(Layout);
  layoutEnum: any = Layout;
  dataLoaded = false;
  message = 'Please wait...';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.rooms = this.route.snapshot.data['rooms'];
    this.users = this.route.snapshot.data['users'];

    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.dataService
        .getBooking(+id)
        .pipe(
          map((booking) => {
            booking.room =
              this.rooms.find((room) => room.id === booking.room.id) ||
              new Room();

            booking.user =
              this.users.find((user) => user.id === booking.user.id) ||
              new User();

            return booking;
          })
        )
        .subscribe((booking) => {
          this.booking = booking;
          this.dataLoaded = true;
          this.message = '';
        });
    } else {
      this.booking = new Booking();
      this.booking.participants = 0;
      this.dataLoaded = true;
      this.message = '';
    }
  }

  onSubmit(): void {
    if (this.booking.id == null) {
      this.dataService.addBooking(this.booking).subscribe({
        next: (next) => this.router.navigate(['']),
        error: (err) =>
          (this.message = "something went wrong : the booking wasn't saved."),
      });
    } else {
      this.dataService.updateBooking(this.booking).subscribe({
        next: (next) => this.router.navigate(['']),
        error: (err) =>
          (this.message = "something went wrong : the booking wasn't saved."),
      });
    }
  }
}
