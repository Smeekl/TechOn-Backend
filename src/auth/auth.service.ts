import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, FindUserDto } from '../user/dto/user.dto';
import { User } from '../user/entities/user.entity';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async create(user: CreateUserDto) {
    const { email, password } = user;
    const userExist = await this.userService.findByEmail(email);

    if (userExist) {
      throw new UnauthorizedException('This user already exist!');
    }

    const payload = { username: email };
    const token = this.jwtService.sign(payload);

    let usernameRegex = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    if (email.length < 3) {
      throw new UnauthorizedException(
        'email must contain more than 3 characters',
      );
    }

    if (password.length <= 0) {
      throw new UnauthorizedException(
        'Password must contain more than 1 characters',
      );
    }

    if (email.match(usernameRegex) === null) {
      throw new UnauthorizedException(
        'Your username is not valid. Only characters A-Z, a-z, 0-9 and should doesnt contains special characters.',
      );
    }

    if (password.match(usernameRegex) === null) {
      throw new UnauthorizedException(
        'Your password is not valid. Only characters A-Z, a-z, 0-9 and should doesnt contains special characters.',
      );
    }

    await this.userService.create(user);
    const validUser = await this.validateUser({
      email,
      password: createHash('sha256').update(password).digest('hex'),
    });

    await this.userService.update(validUser.id, { token: token });
    return token;
  }

  async login(user: LoginDto) {
    const { email, password } = user;
    const payload = { username: email };
    const userExist = await this.userService.findByEmail(email);

    const token = this.jwtService.sign(payload);

    if (!userExist) {
      throw new UnauthorizedException('User not found!');
    }

    const validUser = await this.validateUser({
      email,
      password: createHash('sha256').update(password).digest('hex'),
    });

    if (!validUser) {
      throw new UnauthorizedException('Credentials are incorrect!!!');
    }

    await this.userService.update(validUser.id, {
      token,
    });

    return token;
  }

  async exist(id: FindUserDto) {
    return (await this.userService.findOne(id)) !== undefined;
  }

  async validateUser(payload: LoginDto): Promise<User> {
    const user = await this.userService.findByEmail(payload.email);
    if (user.email === payload.email && user.password === payload.password) {
      return user;
    }
    return null;
  }
}
