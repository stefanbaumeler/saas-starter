import { ArgsType,
    Field } from '@nestjs/graphql'

@ArgsType()
export class ExampleUpdateDto {
    @Field(() => String!)
    id!: string
}

@ArgsType()
export class ExampleCreateDto {
}
