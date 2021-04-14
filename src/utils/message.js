// 用于解决多次message弹出 要求只显示一个message的问题

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
