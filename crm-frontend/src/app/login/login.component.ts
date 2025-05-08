import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
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
    
    try {
      this.authService.login(email, password).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Connexion réussie',
            text: 'Vous êtes maintenant connecté au système.',
            timer: 2000,
            showConfirmButton: false
          });
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.isSubmitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Échec de la connexion',
            text: 'Les informations d\'identification sont incorrectes. Veuillez réessayer.',
          });
        }
      );
    } catch (error) {
      this.isSubmitting = false;
      Swal.fire({
        icon: 'error',
        title: 'Échec de la connexion',
        text: 'Les informations d\'identification sont incorrectes. Veuillez réessayer.',
      });
    }
  }
}