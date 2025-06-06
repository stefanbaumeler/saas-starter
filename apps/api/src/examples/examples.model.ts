import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Example {
    @Field(() => String)
    id!: string
}
