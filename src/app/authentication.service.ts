import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private token: string;
  baseUrl = 'http://localhost:3000/api';

  /**
   * Register
   */
  public register(name, email): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { name, email });
  }

  /**
   * Login
   */
  public login(email, password): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  /**
   * getToken
   */
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  /**
   * getUserDetails
   */
  public getUserDetails() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  /**
   * isLoggedIn
   */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * getFeedback
   */
  public getFeedback(): Observable<any> {
    let token = this.getToken();
    token = token.slice(1, -1);
    return this.http.get(`${this.baseUrl}/feedback`, {
      headers : { 'token': `${token}` }
    });
  }

  /**
   * fetchIds
   */
  public fetchIds(): Observable<any> {
    let token = this.getToken();
    token = token.slice(1, -1);
    // Getting Token Issues
    return this.http.get(`${this.baseUrl}/fetchIds`, {
      headers: {
        'token': `${token}`
      }
    });
  }

  /**
   * giveFeedback
   */
  public giveFeedback(receiver_id, feedback_data): Observable<any> {
    let token = this.getToken();
    token = token.slice(1, -1);
    return this.http.post(`${this.baseUrl}/feedback`, {receiver_id, feedback_data}, {
      headers: {
        'token': `${token}`
      }
    });
  }

}
