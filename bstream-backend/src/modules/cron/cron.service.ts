import { MailService } from '../libs/mail/mail.service'
import { StorageService } from '../libs/storage/storage.service'
import { TelegramService } from '../libs/telegram/telegram.service'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class CronService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
		private readonly storageService: StorageService,
		private readonly telegramService: TelegramService
	) {}

	// @Cron('*/10 * * * * *')
	@Cron('0 0 * * *')
	public async deleteDeactivatedAccounts() {
		const sevenDaysAgo = new Date()
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
		// sevenDaysAgo.setSeconds(sevenDaysAgo.getSeconds() - 10)

		const deactivateAccounts = await this.prismaService.user.findMany({
			where: {
				isDeactivated: true,
				deactivatedAt: {
					lte: sevenDaysAgo
				}
			},
			include: {
				notificationSettings: true,
				stream: true
			}
		})

		for (const user of deactivateAccounts) {
			await this.mailService.sendAccountDeletion(user.email)

			if (
				user.notificationSettings?.telegramNotifications &&
				user.telegramId
			) {
				await this.telegramService.sendAccountDeletion(user.telegramId)
			}

			if (user.avatar) {
				this.storageService.remove(user.avatar)
			}

			if (user.stream?.thumbnailUrl) {
				this.storageService.remove(user.stream.thumbnailUrl)
			}
		}

		await this.prismaService.user.deleteMany({
			where: {
				isDeactivated: true,
				deactivatedAt: {
					lte: sevenDaysAgo
				}
			}
		})
	}
}
