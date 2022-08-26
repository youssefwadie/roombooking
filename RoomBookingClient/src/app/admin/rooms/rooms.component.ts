import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/Room';
import { FormResetService } from '../../form-reset.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [DataService],
})
export class RoomsComponent implements OnInit {
  rooms: Array<Room> = new Array<Room>();
  selectedRoom: Room;
  action = '';
  loadingData = true;
  message = 'Please wait ... getting the list of rooms';
  reloadAttempts = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private formResetService: FormResetService
  ) {}

  ngOnInit(): void {
    this.reloadAttempts = 0;
    this.loadData();
  }

  loadData() {
    this.dataService.getRooms().subscribe({
      next: (next) => {
        this.rooms = next;
        this.loadingData = false;
        this.processUrlParams();
      },
      error: (error) => {
        if (error.status === 402) {
          this.message = 'Sorry - you need to pay to use this application.';
        } else {
          this.reloadAttempts++;
          if (this.reloadAttempts <= 10) {
            this.message =
              'Sorry - someting went wrong, trying again... please wait';
            this.loadData();
          } else {
            this.message = 'Sorry - went wrong, please contact support.';
          }
        }
      },
    });
  }

  processUrlParams() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.action = params['action'];
      if (id) {
        this.selectedRoom =
          this.rooms.find((room) => room.id === +id) || this.rooms[0];
      }
      if (this.action === 'add') {
        this.selectedRoom = new Room();
        this.formResetService.resetFormRoomEvent.emit(this.selectedRoom);
        this.action = 'edit';
      }
    });
  }

  setRoom(id: number): void {
    this.router.navigate(['admin', 'rooms'], {
      queryParams: { id, action: 'view' },
    });
  }

  addRoom(): void {
    this.router.navigate(['admin', 'rooms'], {
      queryParams: { action: 'add' },
    });
  }
}
