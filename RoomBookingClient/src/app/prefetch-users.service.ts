import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { User } from './model/User';

@Injectable({
  providedIn: 'root',
})
export class PrefetchUsersService implements Resolve<Observable<Array<User>>> {
  constructor(private dataService: DataService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this.dataService.getUsers();
  }
}
