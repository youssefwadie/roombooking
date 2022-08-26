import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, of } from 'rxjs';
import { Layout, LayoutCapacity, Room } from './model/Room';
import { User } from './model/User';
import { Booking } from './model/Booking';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TypeofExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restUrl + '/api/rooms').pipe(
      map((data) => {
        return data.map((room: Room) => Room.fromHttp(room));
      })
    );
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users').pipe(
      map((data) => {
        return data.map((user: User) => User.fromHttp(user));
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.restUrl + '/api/users', user);
  }

  addUser(newUser: User, password: string): Observable<User> {
    const userWithPassword = { id: newUser.id, name: newUser.name, password };
    return this.http.post<User>(
      environment.restUrl + '/api/users',
      userWithPassword
    );
  }

  private getCorrectedRoom(room: Room): object {
    const correctedRoom = {
      id: room.id,
      name: room.name,
      location: room.location,
      capacities: new Array<object>(),
    };

    for (const lc of room.capacities) {
      let correctLayout;
      for (let member in Layout) {
        if (Layout[member as keyof typeof Layout] === lc.layout) {
          correctLayout = member;
        }
      }

      const correctedLayout = { layout: correctLayout, capacity: lc.capacity };
      correctedRoom.capacities.push(correctedLayout);
    }

    return correctedRoom;
  }
  updateRoom(room: Room): Observable<Room> {
    return this.http
      .put<Room>(
        environment.restUrl + '/api/rooms',
        this.getCorrectedRoom(room)
      )
      .pipe(map((data) => Room.fromHttp(data)));
  }

  addRoom(newRoom: Room): Observable<Room> {
    return this.http
      .post<Room>(
        environment.restUrl + '/api/rooms',
        this.getCorrectedRoom(newRoom)
      )
      .pipe(map((data) => Room.fromHttp(data)));
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${environment.restUrl}/api/rooms/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.restUrl}/api/users/${id}`);
  }

  resetUserPassword(id: number): Observable<any> {
    return this.http.get(
      `${environment.restUrl}/api/users/resetPassword/${id}`
    );
  }

  getBookings(date: string): Observable<Array<Booking>> {
    return this.http
      .get<Array<Booking>>(`${environment.restUrl}/api/bookings/${date}`)
      .pipe(
        map((bookings) => bookings.map((booking) => Booking.fromHttp(booking)))
      );
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return this.http.post<Booking>(
      environment.restUrl + '/api/bookings',
      this.getCorrectedBooking(newBooking)
    );
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(
      environment.restUrl + '/api/bookings',
      this.getCorrectedBooking(booking)
    );
  }

  getBooking(id: number): Observable<Booking> {
    return this.http
      .get<Booking>(`${environment.restUrl}/api/bookings/${id}`)
      .pipe(map((booking) => Booking.fromHttp(booking)));
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${environment.restUrl}/api/bookings/${id}`);
  }

  private getCorrectedBooking(booking: Booking) {
    let correctLayout;
    for (let member in Layout) {
      if (Layout[member as keyof typeof Layout] === booking.layout) {
        correctLayout = member;
      }
    }

    if (booking.startTime.length < 8) {
      booking.startTime = booking.startTime + ':00';
    }

    if (booking.endTime.length < 8) {
      booking.endTime = booking.endTime + ':00';
    }

    const correctedBooking = {
      id: booking.id,
      room: this.getCorrectedRoom(booking.room),
      user: booking.user,
      title: booking.title,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      participants: booking.participants,
      layout: correctLayout,
    };

    return correctedBooking;
  }
}
