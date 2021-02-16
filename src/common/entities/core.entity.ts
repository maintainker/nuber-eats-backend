import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field } from '@nestjs/graphql';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;
}
