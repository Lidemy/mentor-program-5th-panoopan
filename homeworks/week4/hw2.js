/* eslint-disable import/no-unresolved */
const request = require('request')
const process = require('process')

function book(str) {
  if (str === 'list') {
    request.get(
      'https://lidemy-book-store.herokuapp.com/books?+limit=20',
      (error, response, body) => {
        if (error) return console.log('抓取失敗', error)

        try {
          const data = JSON.parse(body)
          for (let i = 0; i < data.length; i++) {
            console.log(data[i].id, data[i].name)
          }
          return
        } catch (e) {
          return console.log(e) // 錯誤處理
        }
      }
    )
  } else if (str === 'read') {
    const argv3 = process.argv[3]
    request.get(
      `https://lidemy-book-store.herokuapp.com/books/${argv3}`,
      (error, response, body) => {
        if (error) return console.log('抓取失敗', error)

        try {
          const data = JSON.parse(body)
          return console.log(data.id, data.name)
        } catch (e) {
          return console.log(e) // 錯誤處理
        }
      }
    )
  } else if (str === 'delete') {
    const argv3 = process.argv[3]
    request.delete(
      `https://lidemy-book-store.herokuapp.com/books/${argv3}`,
      (error, response, body) => {
        if (error) return console.log('刪除失敗', error)
        return console.log('刪除成功')
      }
    )
  } else if (str === 'create') {
    const argv3 = process.argv[3]
    request.post(
      {
        url: 'https://lidemy-book-store.herokuapp.com/books',
        form: {
          name: argv3
        }
      },
      (error, response, body) => {
        if (error) return console.log('新增失敗', error)

        try {
          const data = JSON.parse(body)
          console.log('新增成功')
          console.log(data.id, data.name)
          return response
        } catch (e) {
          return console.log(e) // 錯誤處理
        }
      }
    )
  } else if (str === 'update') {
    const argv3 = process.argv[3]
    const argv4 = process.argv[4]
    request.patch(
      {
        url: `https://lidemy-book-store.herokuapp.com/books/${argv3}`,
        form: {
          name: argv4
        }
      },
      (error, response, body) => {
        if (error) return console.log('更新失敗', error)

        try {
          const data = JSON.parse(body)
          console.log('更新成功')
          console.log(data.id, data.name)
          return
        } catch (e) {
          return console.log(e) // 錯誤處理
        }
      }
    )
  } else {
    return console.log('請輸入正確指令')
  }
}

book(process.argv[2])
