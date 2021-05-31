/* eslint-disable prefer-destructuring */

document.querySelector('.app').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const value = e.target.value
    if (!value) return
    const div = document.createElement('div')
    div.classList.add('list__item')
    div.innerHTML =
      `
      <div class="list__item-box"><input type="checkbox">${escapeHtml(value)}</div>
      <div class="list__item-btn"></div>
      `
    document.querySelector('.list').appendChild(div)
    e.target.value = ''
  }
})

document.querySelector('.app').addEventListener('click', (e) => {
  if (e.target.classList.contains('list__item-btn')) {
    e.target.closest('.list__item').classList.add('hide')
  }
  if (e.target.parentNode.classList.contains('list__item-box')) {
    e.target.parentNode.classList.toggle('line')
  }
})

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
