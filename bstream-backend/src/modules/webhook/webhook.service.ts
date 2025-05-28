import { LiveKitService } from '../libs/livekit/livekit.service'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WebhookService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly liveKitService: LiveKitService
	) {}

	// public async receiveWebhookLiveKit(body: string, authorization: string) {
	// 	const event = await this.liveKitService.receiver.receive(
	// 		body,
	// 		authorization,
	// 		true
	// 	)

	// 	if (event.event === 'ingress_started') {
	// 		console.log('STREAM STARTED: ', event.ingressInfo?.url)
	// 		await this.prismaService.stream.update({
	// 			where: {
	// 				ingressId: event.ingressInfo?.ingressId
	// 			},
	// 			data: {
	// 				isLive: true
	// 			}
	// 		})
	// 	}

	// 	if (event.event === 'ended') {
	// 		await this.prismaService.stream.update({
	// 			where: {
	// 				ingressId: event.ingressInfo?.ingressId
	// 			},
	// 			data: {
	// 				isLive: false
	// 			}
	// 		})
	// 	}
	// }
	public async receiveWebhookLiveKit(body: string, authorization: string) {
		console.log('Received webhook body:', body)
		console.log('Received webhook authorization:', authorization)
		const event = await this.liveKitService.receiver.receive(
			body,
			authorization,
			true
		)

		console.log('Received event:', event)

		if (event.event === 'ingress_started') {
			console.log('STREAM STARTED: ', event.ingressInfo)
			const stream = await this.prismaService.stream.update({
				where: {
					ingressId: event.ingressInfo?.ingressId
				},
				data: {
					isLive: true
				},
				include: {
					user: true
				}
			})

			console.log('Stream updated:', stream)

			// const followers = await this.prismaService.follow.findMany({
			// 	where: {
			// 		followingId: stream.user.id,
			// 		follower: {
			// 			isDeactivated: false
			// 		}
			// 	},
			// 	include: {
			// 		follower: {
			// 			include: {
			// 				notificationSettings: true
			// 			}
			// 		}
			// 	}
			// })

			// for (const follow of followers) {
			// 	const follower = follow.follower

			// 	if (follower.notificationSettings.siteNotifications) {
			// 		await this.notificationService.createStreamStart(
			// 			follower.id,
			// 			stream.user
			// 		)
			// 	}

			// 	if (
			// 		follower.notificationSettings.telegramNotifications &&
			// 		follower.telegramId
			// 	) {
			// 		await this.telegramService.sendStreamStart(
			// 			follower.telegramId,
			// 			stream.user
			// 		)
			// 	}
			// }
		}

		// if (event.event === 'ingress_ended') {
		// 	const stream = await this.prismaService.stream.update({
		// 		where: {
		// 			ingressId: event.ingressInfo.ingressId
		// 		},
		// 		data: {
		// 			isLive: false
		// 		}
		// 	})

		// 	await this.prismaService.chatMessage.deleteMany({
		// 		where: {
		// 			streamId: stream.id
		// 		}
		// 	})
		// }
	}
}
