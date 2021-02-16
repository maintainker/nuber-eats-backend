import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dtos';
import { LoginOutput, LoginInput } from './dtos/login.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => Boolean)
  hi() {
    return true;
  }

  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      return this.usersService.createAccount(createAccountInput);
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') longinInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.usersService.login(longinInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
