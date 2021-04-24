import dataHandle from './encrypt'

// 数据加密
const key = process.env.VUE_APP_KEY

/**
 * @param {} config 请求设置
 */
const encryptData = (config) => {
	const needEncryptData = JSON.stringify(config.data || {})
	const encryptData = dataHandle.encrypt(needEncryptData, key)
	const nonce = dataHandle.createNonce()
	const timestamp = dataHandle.createTimestamp()
	const sign = dataHandle.createSign(encryptData, nonce, timestamp, key)
	config.data = encryptData
	config.headers['Content-Type'] = 'application/json'
	config.headers['ob-nonce'] = nonce
	config.headers['ob-timestamp'] = timestamp
	// post请求返回加密
	config.headers['zr-encrypted'] = true
	config.headers['ob-sign'] = sign
	return config
}

const decryptData = (data) => {
	return dataHandle.decrypt(data, key)
}

export default { encryptData, decryptData }
