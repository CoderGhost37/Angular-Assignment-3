import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.router.navigate(['/signin']);
  }

  onSubmit(form) {
    const email = form.value.email;
    const password = form.value.password;
    const role = form.value.role;

    this.authService.signup(email, password, role);
    alert('Signed up successfully!');
    form.reset();
  }
}
