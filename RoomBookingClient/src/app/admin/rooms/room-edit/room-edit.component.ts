import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Layout, LayoutCapacity, Room } from 'src/app/model/Room';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';
import { FormResetService } from '../../../form-reset.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css'],
})
export class RoomEditComponent implements OnInit, OnDestroy {
  @Input()
  room: Room;

  @Output()
  dataChangedEvent = new EventEmitter<void>();

  layouts: string[] = Object.keys(Layout);
  layoutEnum: any = Layout;

  roomForm: FormGroup;
  resetEventSubscription: Subscription;

  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private formResetService: FormResetService
  ) {}

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
      location: [
        this.room.location,
        [Validators.required, Validators.minLength(2)],
      ],
    });

    for (const layout of this.layouts) {
      const layoutCapacity = this.room.capacities.find(
        (lc) => lc.layout === Layout[layout as keyof typeof Layout]
      );
      const initialValue = layoutCapacity?.capacity || 0;

      this.roomForm.addControl(
        `layout${layout}`,
        this.formBuilder.control(initialValue)
      );
    }
  }

  onSubmit() {
    this.message = 'Saving ...';
    
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['location'];
    this.room.capacities = new Array<LayoutCapacity>();
    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout as keyof typeof Layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }

    if (this.room.id == null) {
      this.dataService.addRoom(this.room).subscribe({
        next: (savedRoom) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'rooms'], {
            queryParams: { id: savedRoom.id, action: 'view' },
          });
        },
        error: (err) => {
          this.message =
            "Something went wrong and the data wasn't saved. You may want to try again.";
        },
      });
    } else {
      this.dataService.updateRoom(this.room).subscribe({
        next: (savedRoom) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'rooms'], {
            queryParams: { id: savedRoom.id, action: 'view' },
          });
        },
        error: (err) => {
          this.message =
            "Something went wrong and the data wasn't saved. You may want to try again.";
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }
}
