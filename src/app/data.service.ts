import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {Room} from './model/Room';
import {User} from './model/User';
import {Booking} from "./model/Booking";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {
  }

  getRooms(): Observable<Array<Room>> {
    return of([]);
  }

  getUsers(): Observable<Array<User>> {
    return of([]);
  }

  updateUser(user: User): Observable<User> {
    return of(user);
  }

  addUser(newUser: User, password: string): Observable<User> {
    return of(newUser);
  }

  updateRoom(room: Room): Observable<Room> {
    return of(room);
  }

  addRoom(newRoom: Room): Observable<Room> {
    return of(newRoom);
  }

  deleteRoom(id: number): Observable<any> {
    return of(null);
  }

  deleteUser(id: number): Observable<any> {
    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }

  getBookings(date: string): Observable<Array<Booking>> {
    return EMPTY;
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return of(newBooking);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return EMPTY;
  }

  getBooking(id: number): Observable<Booking | undefined> {
    return of(undefined);
  }

  deleteBooking(id: number): Observable<any> {
    return of(null);
  }

}
