import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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

    const user1 = new User();
    user1.id = 1;
    user1.name = 'Youssef';

    const user2 = new User();
    user2.id = 2;
    user2.name = 'Diana';

    const user3 = new User();
    user3.id = 3;
    user3.name = 'Dalia';

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

  updateUser(user: User): Observable<User> {
    const originalUser = this.users.find((u) => u.id === user.id);
    if (originalUser) {
      originalUser.name = user.name;
      return of(originalUser);
    }
    return throwError(() => `no user with id: ${user.id} was found`);
  }

  addUser(newUser: User, password: string): Observable<User> {
    let id = 0;
    for (const user of this.users) {
      if (user.id > id) {
        id = user.id;
      }
    }
    newUser.id = id + 1;
    this.users.push(newUser);
    return of(newUser);
  }
}
