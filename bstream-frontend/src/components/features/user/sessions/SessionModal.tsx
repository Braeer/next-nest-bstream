import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/Dialog'

import { FindSessionsByUserQuery } from '@/graphql/generated/output'

import { formatDate } from '@/utils/format-date'

interface SessionModalProps {
	session: FindSessionsByUserQuery['findSessionsByUser'][0]
}

export function SessionModal({
	children,
	session
}: PropsWithChildren<SessionModalProps>) {
	const t = useTranslations('dashboard.settings.sessions.sessionModal')

	const center = [
		session.metadata.location.latidute,
		session.metadata.location.longitude
	]

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle className='text-xl'>{t('heading')}</DialogTitle>
				<div className='space-y-3'>
					<div className='flex items-center'>
						<span className='font-medium'>{t('device')}</span>
						<span className='text-muted-foreground ml-2'>
							{session.metadata.device.browser},{' '}
							{session.metadata.device.os}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('location')}</span>
						<span className='text-muted-foreground ml-2'>
							{session.metadata.location.country},{' '}
							{session.metadata.location.city}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('ipAddress')}</span>
						<span className='text-muted-foreground ml-2'>
							{session.metadata.ip}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('createdAt')}</span>
						<span className='text-muted-foreground ml-2'>
							{formatDate(session.createdAt, true)}
						</span>
					</div>
					<YMaps>
						<div style={{ width: '100%', height: '300px' }}>
							<Map
								defaultState={{
									center: center.map(Number),
									zoom: 11
								}}
								width='100%'
								height='100%'
							>
								<Placemark geometry={center} />
							</Map>
						</div>
					</YMaps>
				</div>
			</DialogContent>
		</Dialog>
	)
}
