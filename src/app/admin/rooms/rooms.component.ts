import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [DataService],
})
export class RoomsComponent implements OnInit {
  rooms: Array<Room> = new Array<Room>();
  selectedRoom: Room;
  action = 'view';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.getRooms().subscribe((next) => (this.rooms = next));

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.action = params['action'];
      if (id) {
        this.selectedRoom =
          this.rooms.find((room) => room.id === +id) || this.rooms[0];
      }
      if (this.action === 'add') {
        this.selectedRoom = new Room();
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
