import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/AuthService';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  protected usuario = signal<string>('');
  protected contrasena = signal<string>('');
  protected errorLogin = signal<string | null>(null);

  login(): void {
    this.errorLogin.set(null);

    this.authService.login(this.usuario(), this.contrasena()).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorLogin.set('Usuario o contraseña incorrectos');
      }
    });
  }
}