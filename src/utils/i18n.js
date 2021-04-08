// translate router.meta.title, be used in breadcrumb sidebar tagsview
import { routerSwitchNames } from '@/utils/consts'

export function generateTitle(title) {
	const hasKey = routerSwitchNames[title]

	if (hasKey) {
		// $t :this method from vue-i18n, inject in @/lang/index.js
		const translatedTitle = routerSwitchNames[title]

		return translatedTitle
	}
	return title
}
