import user from './user'
import secret from './secret'
import bankController from './bankController'
import roleController from './roleController'
import threeIpwhitelist from './threeIpwhitelist'
import riskManage from './riskManage'
import memberDetails from './memberDetails'
import game from './game'
import agent from './agent'
import control from './control'

export default {
	...bankController,
	...user,
	...secret,
	...roleController,
	...threeIpwhitelist,
	...riskManage,
	...memberDetails,
	...game,
	...agent,
	...control
}
