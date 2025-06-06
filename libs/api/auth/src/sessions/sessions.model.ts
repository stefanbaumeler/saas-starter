import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Session {
    @Field(() => String)
    id!: string

    @Field(() => String)
    expiresAt!: Date

    @Field(() => String)
    token!: string

    @Field(() => String)
    createdAt!: Date

    @Field(() => Date)
    updatedAt!: Date

    @Field(() => String)
    ipAddress!: string

    @Field(() => String)
    userAgent!: string
}
