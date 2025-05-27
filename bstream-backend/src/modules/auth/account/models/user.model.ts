import { SocialLinkModel } from '../../profile/models/social-link.model'
import type { User } from '@/prisma/generated'
import { StreamModel } from '@/src/modules/stream/models/stream.model'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserModel implements User {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public email: string

	@Field(() => String)
	public username: string

	@Field(() => String)
	public displayName: string

	@Field(() => String)
	public password: string

	@Field(() => String, { nullable: true })
	public bio: string

	@Field(() => String, { nullable: true })
	public avatar: string

	@Field(() => Boolean)
	public isVerified: boolean

	@Field(() => Boolean)
	public isTotpEnabled: boolean

	@Field(() => String, { nullable: true })
	public totpSecret: string

	@Field(() => Boolean)
	public isDeactivated: boolean

	@Field(() => Date, { nullable: true })
	public deactivatedAt: Date

	@Field(() => Boolean)
	public isEmailVerified: boolean

	@Field(() => [SocialLinkModel], { nullable: true })
	public socialLinks: SocialLinkModel[]

	@Field(() => StreamModel)
	public stream: StreamModel

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
