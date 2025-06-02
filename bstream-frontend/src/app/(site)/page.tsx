import { useTranslations } from 'next-intl'

import { useCurrent } from '@/hooks/useCurrent'

export default function Home() {
	const t = useTranslations('home')

	return <div className='text-2xl font-bold'>sd</div>
}
