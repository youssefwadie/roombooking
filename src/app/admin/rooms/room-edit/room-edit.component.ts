import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Layout, LayoutCapacity, Room} from 'src/app/model/Room';
import {DataService} from "../../../data.service";
import {Route, Router} from "@angular/router";

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

  roomForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      roomName: [this.room.name, Validators.required],
      location: [this.room.location, [Validators.required, Validators.minLength(2)]]
    });

    for (const layout of this.layouts) {
      const layoutCapacity = this.room.capacities.find(lc => lc.layout === Layout[layout as keyof typeof Layout]);
      const initialValue = layoutCapacity?.capacity || 0;

      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(initialValue));
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

    if (this.room.id == null) {
      this.dataService.addRoom(this.room).subscribe(
        (savedRoom) => {
          this.router.navigate(['admin', 'rooms'], {
            queryParams: {id: savedRoom.id, action: 'view'}
          })
        }
      );
    } else {
      this.dataService.updateRoom(this.room).subscribe(
        (savedRoom) => {
          this.router.navigate(['admin', 'rooms'], {
            queryParams: {id: savedRoom.id, action: 'view'}
          })
        }
      );

    }
  }
}
