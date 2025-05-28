import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit
} from '@nestjs/common'
import { PrismaClient } from '@prisma/generated'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	public async onModuleInit() {
		Logger.log('Connecting to the database...')
		await this.$connect()
		Logger.log('Connected to the database successfully')
	}

	public async onModuleDestroy() {
		await this.$disconnect()
	}
}
