import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { CreateUserDto, LoginAdminDto, LoginUserDto } from '../../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    const token = this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  //User
  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByLogin(loginUserDto);
    const token = this._createToken(user);
    
    const rt = await bcrypt.hash(token.refreshToken, 10);
    user.rt = rt

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ email }): any {
    const accessToken = this.jwtService.sign({ email });
    const refreshToken = this.jwtService.sign({ email });
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
      rtExpiresIn: process.env.RTEXPIRESIN,
      refreshToken,
    };
  }

  private _updateRefreshToken(email: string, rt: string) {

  }

  async logout() {

  }

  async refreshToken() {

  }
}
