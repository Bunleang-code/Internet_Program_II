import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  createUser(body: Partial<User>) {
    const user = this.usersRepo.create(body);
    return this.usersRepo.save(user);
  }

  getUser(username: string) {
    return this.usersRepo.findOne({ 
      where: { username },
      relations: ['tasks'],
    });
  }

  async updateUser(username: string, email: string, password: string, body: Partial<User>) {
    await this.usersRepo.update({ username }, body);
    return this.getUser(username);
  }

  deleteUser(username: string) {
    return this.usersRepo.delete({ username });
  }
}