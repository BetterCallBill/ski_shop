import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(`${this.baseUrl}/account`, { headers }).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  login(values: any) {
    return this.http.post<IUser>(`${this.baseUrl}/account/login`, values).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<IUser>(`${this.baseUrl}/account/register`, values).pipe(
        map(user => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUserSource.next(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    // Redirect to home page
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(`${this.baseUrl}/account/emailexists?email=${email}`);
  }

  getUserAddress() {
    return this.http.get<IAddress>(`${this.baseUrl}/account/address`);
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(`${this.baseUrl}/account/address`, address);
  }
}
