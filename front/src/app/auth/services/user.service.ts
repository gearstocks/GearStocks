/* Angular Modules */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/* RxJs Dependencies */
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* Models */
import { AuthData } from '../models/auth-data.model';
import { User } from '../models/user.model';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public loginUrl = environment.loginUrl;
    public registerUrl = environment.registerUrl;
    public resetPasswordUrl = environment.resetPasswordUrl;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(authData: AuthData): Observable<User> {
        const body = {
            mail: authData.email,
            password: authData.password,
            rememberMe: authData.rememberMe
        };
        return this.http.post<User>(this.loginUrl, body)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    register(authData: AuthData) {
        const body = {
            firstname: authData.firstName,
            lastname: authData.lastName,
            username: authData.userName,
            mail: authData.email,
            password: authData.password
        };
        return this.http.post<any>(this.registerUrl,  body);
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
    }

    resetPassword(email: string) {
        return this.http.post<any>(this.resetPasswordUrl, { email })
            .pipe(map(res => {
                // login successful if there's a jwt token in the response
                if (res) {
                    // message un email a ete envoyé...
                }
                return res;
            }));
    }
}
