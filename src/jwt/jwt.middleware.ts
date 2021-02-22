import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './jwt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if ('x-jwt' in req.headers) {
        const token = req.headers['x-jwt'];
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
          // console.log('ddd', decoded.userId);
          // console.log(decoded['userId']);

          const user = await this.userService.findById(decoded['userId']);
          req['user'] = user;
        }
      }
    } catch (error) {}

    next();
  }
}

// export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
//   console.log(req.headers);
//   next();
// }
