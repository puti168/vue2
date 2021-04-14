import user from './user'
import secret from './secret'
import system from './system'
import audit from './audit'

export default {
	...user,
	...secret,
	...system,
	...audit
}
