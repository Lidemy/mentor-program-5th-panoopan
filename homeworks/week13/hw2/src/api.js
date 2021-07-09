/* eslint-disable */ 
import $ from 'jquery'

// 載入留言 api
export function getCommentsApi(apiURL, siteKey, cb) {
    $.ajax({
        type: 'GET',
        url: `${apiURL}/api_comments.php?site_key=${siteKey}`
    }).done(data => {
        cb(data)
    })    
}

// 新增留言 api
export function addCommentsApi(apiURL, siteKey, formSelector, cb) {
    $.ajax({
        type: 'POST',
        url: `${apiURL}/api_add_comment.php`,
        data: {
            site_key: siteKey,
            nickname: $(`${formSelector} input[name=nickname]`).val(),
            content: $(`${formSelector} textarea[name=content]`).val()
        }
    }).done(data => {
        cb(data)
    })
}


