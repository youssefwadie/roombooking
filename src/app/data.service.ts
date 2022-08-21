import {Injectable} from '@angular/core';
import {EMPTY, map, Observable, of} from 'rxjs';
import {Room} from './model/Room';
import {User} from './model/User';
import {Booking} from "./model/Booking";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  getRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restUrl + '/api/rooms')
    .pipe(map(data => {
      return data.map((room: Room) => Room.fromHttp(room))
    }));
    
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users')
    .pipe(map(data => {
      return data.map((user: User) => User.fromHttp(user));
    }));
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
