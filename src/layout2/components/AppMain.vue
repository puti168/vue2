<template>
	<keep-alive :include="cachedViews">
		<router-view :key="key" />
	</keep-alive>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
	name: 'AppMain2',
	components: {},
	data() {
		return {
			wss: '',
			aesKey: '0123456789ABCDEF',
			timer: '',
			canWs: false
		}
	},
	computed: {
		editVisible() {
			return this.$store.state.app.modifyVisible
		},
		cachedViews() {
			return this.$store.state.tagsView.cachedViews
		},
		key() {
			return this.$route.path
		}
	},
	mounted() {
		this.ws()
	},
	destroyed() {
		window.clearInterval(this.timer)
	},
	methods: {
		// aes加密
		encrypt(data) {
			var key = CryptoJS.enc.Utf8.parse(this.aesKey)
			const encrypt = CryptoJS.AES.encrypt(data, key, {
				iv: key,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			})
			return this.u8stringify(encrypt.ciphertext)
		},
		u8stringify(wordArray) {
			var words = wordArray.words
			var sigBytes = wordArray.sigBytes
			var u8 = new Uint8Array(sigBytes)
			for (var i = 0; i < sigBytes; i++) {
				var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
				u8[i] = byte
			}
			return u8
		},
		// aes解密
		decrypte(result) {
			// 接收的是ArrayBuffer
			// 将u8array转换成WordArray
			var wordArray = CryptoJS.lib.WordArray.create(result)

			// 要求密文是base64格式
			const data = wordArray.toString(CryptoJS.enc.Base64)

			// 解密key
			var key = CryptoJS.enc.Utf8.parse(this.aesKey)

			var decrypted = CryptoJS.AES.decrypt(data, key, {
				iv: key,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			})

			var message = decrypted.toString(CryptoJS.enc.Utf8)
			return message
			// console.log(JSON.parse(JSON.parse(message).body))
		},
		sendHeart() {
			const RequestPackage = {}
			RequestPackage.clientTime = new Date().getTime()
			this.send(1, this.$store.state.user.userInfo.id, RequestPackage)
		},
		send(commandId, playerId, obj) {
			const RequestPackage = {}
			RequestPackage.commandId = commandId
			RequestPackage.playerId = playerId
			RequestPackage.body = JSON.stringify(obj)
			const m = JSON.stringify(RequestPackage)
			this.wss.send(this.encrypt(m))
		},
		ws() {
			const wsurl = process.env.VUE_APP_WSS
			const url =
				wsurl +
				'playerId=' +
				this.$store.state.user.userInfo.id +
				'&jwtSys=1&jwtToken=' +
				this.$store.state.user.token
			this.wss = new WebSocket(url)
			this.wss.binaryType = 'arraybuffer'
			const _this = this
			this.wss.onopen = function() {
				// 成功后发起心跳
				_this.timer = window.setInterval(_this.sendHeart, 5000)
			}
			this.wss.onmessage = function(event) {
				const msg = JSON.parse(_this.decrypte(event.data))
				const jsonStr = JSON.parse(JSON.parse(_this.decrypte(event.data)).body)
				if (msg.commandId !== 1) {
					console.log('有消息来了')
					console.log(msg)
					console.log(jsonStr)
				}

				if (msg.commandId === 100) {
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.auditNewUser,
						type: 'auditNewUser'
					})
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.auditUpdateInfoUser,
						type: 'auditUpdateInfoUser'
					})
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.auditNewAgent,
						type: 'auditNewAgent'
					})
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.auditUpdateInfoAgent,
						type: 'auditUpdateInfoAgent'
					})
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.auditChangeAgent,
						type: 'auditChangeAgent'
					})
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.auditPatchAgent,
						type: 'auditPatchAgent'
					})
                    // 资金模块
                    _this.$store.dispatch('user/setAudit', {
                        value: jsonStr.auditMemberWithdrawUser,
                        type: 'auditMemberWithdrawUser'
                    })
                    _this.$store.dispatch('user/setAudit', {
                        value: jsonStr.auditProxyWithdrawAgent,
                        type: 'auditProxyWithdrawAgent'
                    })
                    _this.$store.dispatch('user/setAudit', {
                        value: jsonStr.auditMemberArtificialAddUser,
                        type: 'auditMemberArtificialAddUser'
                    })
                    _this.$store.dispatch('user/setAudit', {
                        value: jsonStr.auditProxyArtificialAddAgent,
                        type: 'auditProxyArtificialAddAgent'
                    })
                    _this.$store.dispatch('user/setAudit', {
                        value: jsonStr.auditProxyCommissionAgent,
                        type: 'auditProxyCommissionAgent'
                    })
				} else if (msg.commandId === 101) {
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.count,
						type: 'auditNewUser'
					})
				} else if (msg.commandId === 102) {
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.count,
						type: 'auditUpdateInfoUser'
					})
				} else if (msg.commandId === 103) {
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.count,
						type: 'auditNewAgent'
					})
				} else if (msg.commandId === 104) {
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.count,
						type: 'auditUpdateInfoAgent'
					})
				} else if (msg.commandId === 105) {
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.count,
						type: 'auditChangeAgent'
					})
				} else if (msg.commandId === 106) {
					_this.$store.dispatch('user/setAudit', {
						value: jsonStr.count,
						type: 'auditPatchAgent'
					})
				}
			}
			this.wss.onclose = function() {
				window.clearInterval(_this.timer)
				this.canWs = true
				// TODO:暂时关闭重连机制
				// setTimeout(() => {
				// 	if (this.canWs) {
				// 		_this.ws()
				// 	}
				// }, 10000)
			}
			this.wss.onerror = function() {
				// console.log(evt)
			}
		}
	}
}
</script>

<style scoped>
.app-main {
	/*50 = navbar  */
	min-height: calc(100vh - 105px);
	width: 100%;
	position: relative;
	overflow: hidden;
}
.fixed-header + .app-main {
	padding-top: 105px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
//   .fixed-header {
//     padding-right: 15px;
//   }
// }
</style>
