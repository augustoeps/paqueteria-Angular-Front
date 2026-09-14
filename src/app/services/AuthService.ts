import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/auth/login';

    login(username: string, password: string): Observable<LoginResponse> {
        const body: LoginRequest = { username, password };

        return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
        tap(respuesta => this.guardarToken(respuesta.token))
        );
    }

    guardarToken(token: string): void {
        localStorage.setItem('token', token);
    }

    obtenerToken(): string | null {
        return localStorage.getItem('token');
    }
    estaAutenticado(): boolean {
     return this.obtenerToken() !== null;
    }

    logout(): void {
        localStorage.removeItem('token');
    }





}