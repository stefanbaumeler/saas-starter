import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
    @Field(() => String)
    id!: string

    @Field(() => String)
    email!: string

    @Field(() => Boolean)
    emailVerified!: boolean

    @Field(() => String)
    image!: string

    @Field(() => String)
    createdAt!: Date

    @Field(() => String)
    updatedAt!: Date

    @Field(() => String)
    role!: string

    @Field(() => String)
    twoFactorEnabled!: boolean
}
