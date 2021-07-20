/* eslint-disable */ 
export const cssTemplate = 
`
.card {
    white-space: pre-line;
}
`
/*
export const formTemplate = 
`
<div>
    <h1 class="text-center mb-3">Message Board</h1>
    <form class="add-comment-form">
        <div class="form-group mb-3">
            <label for="form-nickname" class="form-label">Nickname</label>
            <input name="nickname" type="text" class="form-control" id="form-nickname">
        </div>
        <div class="form-group mb-3">
            <label for="content-textarea">Content</label>
            <textarea name="content" class="form-control" id="content-textarea" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
    </form>
    <div class="comments">
    </div>
    <button type="button" class="btn btn-viewmore btn-primary mt-2">View more</button>
</div>
`
*/

export function getForm(formClassName, commentsClassName, btnClassName) {
    return`
    <div>
        <h1 class="text-center mb-3">Message Board</h1>
        <form class="${formClassName}">
            <div class="form-group mb-3">
                <label for="form-nickname" class="form-label">Nickname</label>
                <input name="nickname" type="text" class="form-control" id="form-nickname">
            </div>
            <div class="form-group mb-3">
                <label for="content-textarea">Content</label>
                <textarea name="content" class="form-control" id="content-textarea" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send</button>
        </form>
        <div class="${commentsClassName}">
        </div>
        <button type="button" class="btn ${btnClassName} btn-primary mt-2">View more</button>
    </div>
    `
}