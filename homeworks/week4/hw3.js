/* eslint-disable import/no-unresolved */
const request = require('request')
const process = require('process')

const argv = process.argv[2]

if (!argv) {
  console.log('請輸入國家名稱')
}

request(
  `https://restcountries.eu/rest/v2/name/${argv}`,
  (error, response, body) => {
    if (error) return console.log('抓取失敗', error)

    let data
    try {
      data = JSON.parse(body)
    } catch (e) {
      console.log(e) // 錯誤處理
    }

    if (response.statusCode >= 400 && response.statusCode < 500) {
      return console.log('找不到國家資訊')
    }

    for (let i = 0; i < data.length; i++) {
      console.log('============')
      console.log('國家：', data[i].name)
      console.log('首都：', data[i].capital)
      console.log('貨幣：', data[i].currencies[0].code)
      console.log('國碼：', data[i].callingCodes[0])
    }
    return response
  }
)
