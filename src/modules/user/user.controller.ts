import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getAllUser() {
    return this.userService.findAllUsers();
  }

  @Get('/:id')
  getOneUser(@Param('id') id: number){
    return this.userService.findOneUser(id);
  }
  
  @Post('/')
  createUser(@Body() body: createUserDto) {
    return this.userService.createUser(body);
  }

  @Patch('/:id')
  updateUser(
    @Body() body: { username: string; email: string; password: string },
    @Param('id') id: number
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.removeUser(id);
  }
}
