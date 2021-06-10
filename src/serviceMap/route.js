import member from './member'
import game from './game'
import agent from './agent'
import control from './control'
import funds from './funds'
import operation from './operation'
// import report from './report'
import system from './system'
export default [
	...control,
	...funds,
	...operation,
	// ...report,
	...system,
	...member,
	...game,
	...agent
]
