
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get() 
  async getUser() {
    return this.userService.find()
  }
}
