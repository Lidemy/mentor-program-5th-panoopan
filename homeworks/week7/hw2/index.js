
document.querySelector('.faq').addEventListener('click', (e) => {
  if (e.target.parentNode.classList.contains('faq__question')) {
    e.target.closest('.faq__item').classList.toggle('hide')
  }
})
