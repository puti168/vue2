import user from './user'
import secret from './secret'
import bankController from './bankController'
import roleController from './roleController'

export default {
	...bankController,
	...user,
	...secret,
	...roleController
}
