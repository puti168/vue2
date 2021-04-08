import { Message } from 'element-ui'

export function message(options) {
	return createMsg(options)
}

function createMsg(options) {
	if (window.msgInstance) {
		Message.closeAll()
		window.msgInstance = undefined
	}

	window.msgInstance = Message(options)

	return window.msgInstance
}
