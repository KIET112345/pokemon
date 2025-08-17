import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private snack: MatSnackBar, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.signup(this.form.value as any).subscribe({
      next: () => { this.loading = false; this.snack.open('Signup successful', 'Close', { duration: 3000 }); this.router.navigateByUrl('/login'); },
      error: () => { this.loading = false; this.snack.open('Signup failed', 'Close', { duration: 3000 }); }
    });
  }
}
