import { ArgsType,
    Field } from '@nestjs/graphql'

@ArgsType()
export class UserUpdateDto {
    @Field(() => String!)
    id!: string
}

@ArgsType()
export class UserCreateDto {
}
