import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = environment.url + environment.registerapi + '?key=ss';

  constructor(private http: HttpClient) { }

  postDetails(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
