import { UserModel } from '../../auth/account/models/user.model'
import type { Stream } from '@/prisma/generated'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StreamModel implements Stream {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public title: string

	@Field(() => String, { nullable: true })
	public ingressId: string

	@Field(() => String, { nullable: true })
	public serverUrl: string

	@Field(() => Boolean)
	public isLive: boolean

	@Field(() => String)
	public userId: string

	@Field(() => UserModel)
	public user: UserModel

	@Field(() => String, { nullable: true })
	public streamKey: string

	@Field(() => String, { nullable: true })
	public thumbnailUrl: string

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
