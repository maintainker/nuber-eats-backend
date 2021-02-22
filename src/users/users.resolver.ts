import { Resolver, Query, Mutation, Args, InputType } from '@nestjs/graphql';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dtos';
import { LoginOutput, LoginInput } from './dtos/login.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileOutPut, EditProfileInput } from './dtos/edit-profile.dot';
import { VerifyEmailOutput, VerifyEmailInput } from './dtos/verify-email.dto';

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

  @Query(() => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    console.log(authUser);
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query(() => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    try {
      const user = await this.usersService.findById(userProfileInput.userId);
      if (!user) {
        throw Error();
      }
      return {
        ok: Boolean(user),
        user,
      };
    } catch (error) {
      return {
        error: 'User Not Found',
        ok: false,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EditProfileOutPut)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutPut> {
    console.log(editProfileInput, authUser);
    try {
      await this.usersService.editProfile(authUser.id, editProfileInput);
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
        error: err,
      };
    }
  }

  @Mutation(() => VerifyEmailOutput)
  verifyEmail(@Args('input') { code }: VerifyEmailInput) {
    this.usersService.verifyEmail(code);
  }
}
