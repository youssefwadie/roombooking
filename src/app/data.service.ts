import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Layout, LayoutCapacity, Room } from './model/Room';
import { User } from './model/User';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private rooms: Array<Room>;
  private users: Array<User>;

  constructor() {
    this.rooms = new Array<Room>();
    this.users = new Array<User>();

    const room1 = new Room(1, 'First Room', 'First Floor');

    const capacity1 = new LayoutCapacity(Layout.THEATER, 50);
    const capacity2 = new LayoutCapacity(Layout.USHAPE, 20);
    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);

    const room2 = new Room(2, 'Second Room', 'Third Floor');
    const capacity3 = new LayoutCapacity(Layout.THEATER, 60);
    room2.capacities.push(capacity3);
    this.rooms.push(room1);
    this.rooms.push(room2);

    const user1 = new User(1, 'Youssef');
    const user2 = new User(2, 'Diana');
    const user3 = new User(3, 'Dalia');
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
  }

  getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users);
  }
}
