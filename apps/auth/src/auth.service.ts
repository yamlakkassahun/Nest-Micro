import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async postUser(): Promise<User> {
    const user = this.userRepository.create({ name: 'Zion' });
    await this.userRepository.save(user);
    return user;
  }
}
