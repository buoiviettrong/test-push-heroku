import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector){}

  // const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
  //   context.getHandler(),
  //   context.getClass() 
  // ])

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass() 
    ])

    if(!requiredRole) return true

    const { user } = context.switchToHttp().getRequest()

    return requiredRole.some((role) => user?.role.includes(role) )
  }
}
