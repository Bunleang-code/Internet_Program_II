import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  createTask(taskData: Partial<Task>) {
  const task = this.tasksRepo.create(taskData);
  return this.tasksRepo.save(task);
  }

  findAllTasks(){
    return this.tasksRepo.find({ relations: ['user'] });
  } 

  findOneTask(id: number) {
    return this.tasksRepo.findOne({ where: { id }, relations: ['user'],
    });
  }

  async updateTask(id: number, taskData: Partial<Task>) {
    await this.tasksRepo.update(id, taskData);
    return this.findOneTask(id);
  }

  removeTask(id: number) {
    this.tasksRepo.delete(id);
    return { message: 'success' };
  }
}