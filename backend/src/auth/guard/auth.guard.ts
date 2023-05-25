/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      // Handle missing access token
      return false;
    }

    try {
      const payload = this.jwtService.verify(accessToken);
      // Validate the payload and grant access if it's valid
      return true;
    } catch (error) {
      return false;
    }
  }
}
