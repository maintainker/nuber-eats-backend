import { Injectable, Inject } from '@nestjs/common';
import { JwtModuleOption } from './jwt.interfaces';
import { CONFIG_OPTION } from './jwt.constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTION) private readonly options: JwtModuleOption,
  ) {}

  sign(userId: number): string {
    console.log('hello');
    return jwt.sign({ userId }, this.options.privateKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
