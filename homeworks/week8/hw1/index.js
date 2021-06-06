
const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errorMassage = '系統不穩定，請再試一次'

// call API
function getPrize(cb) {
  const request = new XMLHttpRequest()

  request.open('GET', url, true)

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let data
      try {
        data = JSON.parse(request.response)
      } catch (err) {
        cb(errorMassage)
        return
      }

      if (!data.prize) {
        cb(errorMassage)
        return
      }

      cb(null, data)
    } else {
      cb(errorMassage)
    }
  }

  request.onerror = function() {
    cb(errorMassage)
  }

  request.send()
}

// EventListener
document.querySelector('.game__btn').addEventListener('click', () => {
  getPrize((err, data) => {
    if (err) {
      alert(err)
      return
    }

    const prizes = {
      FIRST: {
        className: 'banner-first',
        title: '恭喜你中頭獎了！日本東京來回雙人遊！'
      },
      SECOND: {
        className: 'banner-second',
        title: '二獎！90 吋電視一台！'
      },
      THIRD: {
        className: 'banner-third',
        title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
      },
      NONE: {
        className: 'banner-none',
        title: '銘謝惠顧'
      }
    }

    const { className, title } = prizes[data.prize]
    document.querySelector('.game').classList.add('game-none')
    document.querySelector('.banner').classList.add(className)
    const div = document.createElement('div')
    div.classList.add('prize')
    div.innerHTML =
    `
    <div class="prize__title">${title}</div>
    <div class="prize__btn" onclick="javascript:window.location.reload()">
      我要抽獎
    </div>
    `
    document.querySelector('body').appendChild(div)
  })
})
