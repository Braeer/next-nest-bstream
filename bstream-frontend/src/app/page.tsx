'use client'

import { useTranslations } from 'next-intl'

import { useFindChannelByUsernameQuery } from '@/graphql/generated/output'

export default function Home() {
	const t = useTranslations('home')

	return <div className='text-2xl'>{t('title')}</div>
}
