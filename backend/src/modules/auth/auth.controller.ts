import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  signup(@Body() body: import('./dto').CredentialsDto) {
    return this.auth.signup(body.username, body.password);
  }

  @Post('login')
  login(@Body() body: import('./dto').CredentialsDto) {
    return this.auth.login(body.username, body.password);
  }

  @Post('logout')
  logout() {
    return { ok: true };
  }
}
