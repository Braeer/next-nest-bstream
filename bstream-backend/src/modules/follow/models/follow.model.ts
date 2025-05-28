import { UserModel } from '../../auth/account/models/user.model'
import { StreamModel } from '../../stream/models/stream.model'
import type { Category, Follow, Stream } from '@/prisma/generated'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FollowModel implements Follow {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public followerId: string

	@Field(() => UserModel)
	public follower: UserModel

	@Field(() => String)
	public followingId: string

	@Field(() => UserModel)
	public following: UserModel

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
