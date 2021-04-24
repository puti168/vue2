import user from './user'
import secret from './secret'
import bankController from './bankController'

export default {
	...bankController,
	...user,
	...secret
}
