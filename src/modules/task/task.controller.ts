import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  getAllTasks(){
    return this.taskService.findAllTasks();
  }

  @Get('/:id')
  getOneTask(@Param('id') id: number) {
    return this.taskService.findOneTask(id);
  }
   
  @Post('/')
  createTask(@Body() body: any) {
    return this.taskService.createTask(body);
  }

  @Patch('/:id')
  updateTask(
    @Body() body: any, 
    @Param('id') id: number) {
    return this.taskService.updateTask(id, body);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.removeTask(id);
  }
}
