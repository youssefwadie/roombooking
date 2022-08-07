import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Layout, LayoutCapacity, Room} from 'src/app/model/Room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css'],
})
export class RoomEditComponent implements OnInit {
  @Input()
  room: Room;


  layouts: string[] = Object.keys(Layout);
  layoutEnum: any = Layout;

  roomForm = new FormGroup<any>({
    roomName: new FormControl('roomName'),
    location: new FormControl('location'),
  });

  constructor() {
  }

  ngOnInit(): void {
    this.roomForm.patchValue({
      roomName: this.room.name,
      location: this.room.location,
    });

    for (const layout of this.layouts) {
      this.roomForm.addControl(`layout${layout}`,
        new FormControl(`layout${layout}`),
        {emitEvent: true}
      );

    }
  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value || '';
    this.room.location = this.roomForm.value['location'] || '';
    this.room.capacities = new Array<LayoutCapacity>();
    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout as keyof typeof Layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }
    console.log(this.room);
    // TODO call a method to save the room
  }
}
