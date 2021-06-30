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
import vipConfig from './vipConfig'
import memberFunds from './memberFunds'
import funds from './funds'
import operation from './operation'
import agencyfunds from './agencyfunds'
import system from './system'

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
	...control,
	...vipConfig,
	...memberFunds,
	...funds,
	...operation,
	...agencyfunds,
	...system
}
