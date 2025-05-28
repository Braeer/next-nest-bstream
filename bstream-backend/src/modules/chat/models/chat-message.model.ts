import { UserModel } from '../../auth/account/models/user.model'
import { CategoryModel } from '../../category/models/category.model'
import { StreamModel } from '../../stream/models/stream.model'
import type { ChatMessage, Stream } from '@/prisma/generated'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ChatMessageModel implements ChatMessage {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public text: string

	@Field(() => String)
	public userId: string

	@Field(() => UserModel)
	public user: UserModel

	@Field(() => String)
	public streamId: string

	@Field(() => StreamModel)
	public stream: StreamModel

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
