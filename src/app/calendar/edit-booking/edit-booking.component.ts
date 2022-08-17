import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../data.service";
import {Booking} from "../../model/Booking";
import {Layout, Room} from "../../model/Room";
import {User} from "../../model/User";

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  booking: Booking;
  rooms: Array<Room>;
  users: Array<User>;

  layouts: string[] = Object.keys(Layout);
  layoutEnum: any = Layout;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
    this.dataService.getUsers()
      .subscribe(users => this.users = users);
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.dataService.getBooking(+id).subscribe(
        booking => {
          if (booking) {
            this.booking = booking
          }
        }
      );
    }
    if (!this.booking) {
      this.booking = new Booking();
      this.booking.participants = 0;
    }
  }

  onSubmit(): void {
    if (this.booking.id == null) {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    } else {
      this.dataService.updateBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    }
  }
}
