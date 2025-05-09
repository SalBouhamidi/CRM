import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;
    
    // Si vous utilisez un service d'authentification réel
    this.authService.login(email, password).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          text: 'Vous êtes maintenant connecté au système.',
          timer: 2000,
          showConfirmButton: false
        });
        // Rediriger vers la page d'accueil après la connexion
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Échec de la connexion',
          text: 'Les informations d\'identification sont incorrectes. Veuillez réessayer.',
        });
      }
    });
    
  
    setTimeout(() => {
      this.isSubmitting = false;
      // Simuler une connexion réussie
      localStorage.setItem('auth_token', 'fake-jwt-token');
      localStorage.setItem('user_data', JSON.stringify({
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'admin'
      }));
      
      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: 'Vous êtes maintenant connecté au système.',
        timer: 2000,
        showConfirmButton: false
      });
      
      // Rediriger vers la page d'accueil après la connexion
      this.router.navigate(['/dashboard']);
    }, 1500);

  }
}