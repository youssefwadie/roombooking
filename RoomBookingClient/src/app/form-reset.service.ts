import {EventEmitter, Injectable} from '@angular/core';
import {Room} from "./model/Room";
import {User} from "./model/User";

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetFormRoomEvent = new EventEmitter<Room>();
  resetFormUserEvent = new EventEmitter<User>();
  constructor() { }
}
