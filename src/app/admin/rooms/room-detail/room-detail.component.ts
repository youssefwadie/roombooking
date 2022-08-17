import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Room} from 'src/app/model/Room';
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
})
export class RoomDetailComponent implements OnInit {
  @Input()
  room!: Room;

  constructor(private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  editRoom(): void {
    this.router.navigate(['admin', 'rooms'], {
      queryParams: {id: this.room.id, action: 'edit'},
    });
  }

  deleteRoom(): void {
    this.dataService.deleteRoom(this.room.id).subscribe(
      next => {
        this.router.navigate(['admin', 'rooms']);
      }
    );
  }

}
