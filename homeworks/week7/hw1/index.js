
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()

  const inputs = document.querySelectorAll('.required input[type=text]')
  const radios = document.querySelectorAll('.required input[type=radio]')
  let isValid = true
  const values = {}

  for (const input of inputs) {
    values[input.name] = input.value
    if (!input.value) {
      isValid = false
      input.closest('.required').classList.remove('hide-error')
    } else {
      input.closest('.required').classList.add('hide-error')
    }
  }

  for (const radio of radios) {
    if (!([...radios].some((radio) => radio.checked))) {
      isValid = false
      radio.closest('.required').classList.remove('hide-error')
    } else {
      values[radio.name] = radio.value
      radio.closest('.required').classList.add('hide-error')
    }
  }

  if (isValid) {
    alert(JSON.stringify(values))
  }
})
