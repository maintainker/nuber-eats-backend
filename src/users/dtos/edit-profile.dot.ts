import { CoreOutput } from 'src/common/dtos/output.dto';
import { ObjectType, PickType, PartialType, InputType } from '@nestjs/graphql';
import { User } from '../entities/users.entity';

@ObjectType()
export class EditProfileOutPut extends CoreOutput {}

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}
