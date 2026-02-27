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

  createUser(userData: Partial<User>) {
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  findAllUsers() {
    return this.usersRepo.find({ relations: ['tasks'] });
  }

  findOneUser(id: number) {
    return this.usersRepo.findOne({ where: {id}, relations: ['tasks']});
  }

  async updateUser(id: number, updateData: Partial<User>) {
    await this.usersRepo.update( id , updateData);
    return this.findOneUser(id);
  }

  removeUser(id: number) {
    this.usersRepo.delete( id );
    return { message: 'success'};
  }
}