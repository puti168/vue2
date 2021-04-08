import { MessageBox } from 'element-ui'
import store from '@/store'

export default function downloadSure(apis, api, params, name) {
	const userInfo = store.state.user.userInfo
	const nowTime = new Date().valueOf()
	const downloadFileName = `${userInfo.agentCode}_${name}_${nowTime}.csv`
	apis[api]({
		...params,
		downloadFileName
	}).then((res) => {
		if (res.code === 200) {
			const htmlContent = `下载任务 ${downloadFileName}已经生成请到 <a href='/#/systemmanagement/downloadlog' target='_blank' class='download-link'>下载管理页面</a>进行下载`
			MessageBox.confirm(htmlContent, '下载任务', {
				dangerouslyUseHTMLString: true
			})
		}
	})
}
