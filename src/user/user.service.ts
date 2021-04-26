import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  FindUserDto,
  UpdateUserDto,
  UserDto,
} from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    return this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: FindUserDto) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async update(criteria: number | UserDto, user: UserDto) {
    await this.userRepository.update(criteria, user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}