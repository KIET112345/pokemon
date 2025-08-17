import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private jwt: JwtService,
  ) {}

  async signup(username: string, password: string) {
    const existing = await this.users.findOne({ where: { username } });
    if (existing) throw new ConflictException('Username already taken');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.users.create({ username, passwordHash });
    await this.users.save(user);
    return this.signToken(user);
  }

  async login(username: string, password: string) {
    const user = await this.users.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.signToken(user);
  }

  private signToken(user: User) {
    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwt.sign(payload) };
  }
}
