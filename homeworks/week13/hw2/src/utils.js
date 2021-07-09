/* eslint-disable */ 
import $ from 'jquery'

export function loadComments(data, commentsSelector,  btnSelector) {
    const comments = data.discussions // 所有留言
    const total = comments.length // 總共有幾筆留言
    var limit = 5 // 一次顯示幾筆留言
    var offset = 0 // 要從哪一筆資料開始顯示
    var load = offset + limit 
    viewMore(offset, load, total, comments, commentsSelector, btnSelector)

    $(btnSelector).click(e => {
        offset = load
        load += limit
        viewMore(offset, load, total, comments, commentsSelector, btnSelector)
    })
}

function viewMore(offset, load, total, comments, commentsSelector,  btnSelector) {
    if (load >= total) {
        $(btnSelector).remove()
    } 

    for (let i=offset; i<load; i++) {
        $(commentsSelector).append(
            `
            <div class="card mt-3">
                <div class="card-body">
                    <h5 class="card-title">${escapeHtml(comments[i].nickname)}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${escapeHtml(comments[i].created_at)}</h6>
                    <p class="card-text">${escapeHtml(comments[i].content)}</p>
                </div>      
            </div>
            `
        )
        
        if (i === total-1) return
    }
}

// 預防 xss 攻擊
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// css
export function addStyle(css) {
    $('head').append(`<style>${css}</style>`)
}