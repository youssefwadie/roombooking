import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Layout, LayoutCapacity, Room} from 'src/app/model/Room';
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css'],
})
export class RoomEditComponent implements OnInit, OnDestroy {
  @Input()
  room: Room;


  layouts: string[] = Object.keys(Layout);
  layoutEnum: any = Layout;

  roomForm: FormGroup;
  resetEventSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dataService: DataService,
              private formResetService: FormResetService) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.resetEventSubscription =
      this.formResetService.resetFormRoomEvent.subscribe((roomToEdit) => {
        this.room = roomToEdit;
        this.initializeForm();
      });
  }

  initializeForm(): void {
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

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }
}
