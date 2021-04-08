import defaultSettings from '@/settings'
import i18n from '@/utils/lang'

const title = defaultSettings.title || 'zr - b2b'

export default function getPageTitle(key) {
	const hasKey = i18n.te(`route.${key}`)
	if (hasKey) {
		const pageName = i18n.t(`route.${key}`)
		return `${pageName} - ${title}`
	}
	return `${title}`
}
