/* eslint-disable */ 
import { getCommentsApi, addCommentsApi } from './api'
import { loadComments, addStyle } from './utils'
import { cssTemplate, getForm} from './template'
import $ from 'jquery'


export function init(options) {
	// 初始化
	let siteKey = ''
	let apiURL = ''
	let containerElement = null
	
	let formClassName
	let formSelector
	let commentsClassName
	let commentsSelector
	let btnClassName
	let btnSelector

	// 載入參數
	siteKey = options.siteKey
	apiURL = options.apiURL

	formClassName = `${siteKey}-add-comment-form`
	formSelector = `.${formClassName}`
	commentsClassName = `${siteKey}-comments`
	commentsSelector = `.${commentsClassName}`
	btnClassName = `${siteKey}-btn-viewmore`
	btnSelector = `.${btnClassName}`

	containerElement = $(options.containerSelector)
	containerElement.append(getForm(formClassName, commentsClassName, btnClassName))


	// 載入 css
	addStyle(cssTemplate)

	// 載入留言
	getCommentsApi(apiURL, siteKey, data => {
		if (!data.ok) {
			alert(data.message)
			return
		}
		loadComments(data, commentsSelector,  btnSelector)
	})

	// 新增留言
	$(formSelector).submit(e => {
		e.preventDefault()

		$(`${formSelector} button`).hide()

		addCommentsApi(apiURL, siteKey, formSelector, data => {
			if (!data.ok) {
				alert(data.message)
				$(`${formSelector} button`).show()
				return
			}
			
			location.reload()
		})
	})
}

