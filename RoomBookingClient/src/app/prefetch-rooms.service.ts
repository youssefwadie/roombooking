import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Room } from './model/Room';

@Injectable({
  providedIn: 'root',
})
export class PrefetchRoomsService implements Resolve<Observable<Array<Room>>> {
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Room[]> {
    return this.dataService.getRooms();
  }
}
