/* eslint-disable import/no-unresolved */
const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (error) return console.log('抓取失敗', error)

    let data
    try {
      data = JSON.parse(body)
    } catch (e) {
      console.log(e) // 錯誤處理
    }

    for (let i = 0; i < data.length; i++) {
      console.log(data[i].id, data[i].name)
    }
    return response
  }
)
