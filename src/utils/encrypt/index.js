import dataHandle from './encrypt'

// 数据加密
const key = '0123456789ABCDEF'

/**
 * @param {} config 请求设置
 */
const encryptData = (config) => {
	console.log('dataHandle :', dataHandle)
	const needEncryptData = JSON.stringify(config.data || {})
	const encryptData = dataHandle.encrypt(needEncryptData, key)
	const nonce = dataHandle.createNonce()
	const timestamp = dataHandle.createTimestamp()
	const sign = dataHandle.createSign(encryptData, nonce, timestamp, key)
	console.log(encryptData)
	config.data = encryptData
	config.headers['Content-Type'] = 'application/json'
	config.headers['zr-nonce'] = nonce
	config.headers['zr-timestamp'] = timestamp
	config.headers['zr-gzipped'] = true
	config.headers['zr-encrypted'] = true
	config.headers['zr-sign'] = sign

	return config
}

const decryptData = (data) => {
	return dataHandle.decrypt(data, key)
}

export default { encryptData, decryptData }
