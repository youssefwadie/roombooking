import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/model/Room';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
})
export class RoomDetailComponent implements OnInit {
  @Input()
  room!: Room;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {}

  editRoom(): void {
    this.router.navigate(['admin', 'rooms'], {
      queryParams: { id: this.room.id, action: 'edit' },
    });
  }

  deleteRoom(): void {
    const result = confirm('Are you sure you wish to delete this room');
    if (result) {
      this.message = 'Deleting...';
      this.dataService.deleteRoom(this.room.id).subscribe({
        next: (next) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'rooms']);
        },
        error: (err) => {
          this.message = 'Sorry this room cannot be deleted at this time.';
        },
      });
    }
  }
}
