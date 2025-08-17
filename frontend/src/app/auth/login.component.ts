import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private snack: MatSnackBar, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.login(this.form.value as any).subscribe({
      next: () => { this.loading = false; this.router.navigateByUrl('/'); },
      error: () => { this.loading = false; this.snack.open('Login failed', 'Close', { duration: 3000 }); }
    });
  }
}
