import { VerificationService } from '../verification/verification.service'
import type { ChangeEmailInput } from './inputs/change-email.input'
import type { ChangePasswordInput } from './inputs/change-password.input'
import type { CreateUserInput } from './inputs/create-user.input'
import type { User } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import {
	ConflictException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { hash, verify } from 'argon2'

@Injectable()
export class AccountService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly verificationService: VerificationService
	) {}

	public async me(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			},
			include: {
				socialLinks: true
			}
		})

		return user
	}

	public async findAll() {
		const users = await this.prismaService.user.findMany()

		return users
	}

	public async create(input: CreateUserInput) {
		const { email, password, username } = input

		const isUsernameExists = await this.prismaService.user.findUnique({
			where: {
				username
			}
		})

		if (isUsernameExists) {
			throw new ConflictException('Это имя пользователя уже занято')
		}

		const isEmailExists = await this.prismaService.user.findUnique({
			where: {
				email
			}
		})

		if (isEmailExists) {
			throw new ConflictException('Эта почта уже занято')
		}

		const user = await this.prismaService.user.create({
			data: {
				username,
				email,
				password: await hash(password),
				displayName: username,
				stream: {
					create: {
						title: `Стрим ${username}`
					}
				}
			}
		})

		await this.verificationService.sendVerificationToken(user)

		return true
	}

	public async changeEmail(user: User, input: ChangeEmailInput) {
		const { email } = input

		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				email
			}
		})

		return true
	}

	public async changePassword(user: User, input: ChangePasswordInput) {
		const { oldPassword, newPassword } = input

		const isValidPassword = await verify(user.password, oldPassword)

		if (!isValidPassword) {
			throw new UnauthorizedException('Неверный пароль')
		}

		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				password: await hash(newPassword)
			}
		})

		return true
	}
}
