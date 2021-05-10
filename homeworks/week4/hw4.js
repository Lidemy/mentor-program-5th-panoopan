/* eslint-disable import/no-unresolved */
const request = require('request')

const CLIENT_ID = 'z0vtb0aw3epmvls35t9pn8xyl65kj9'

const BASE_URL = 'https://api.twitch.tv/kraken'

request(
  {
    url: `${BASE_URL}/games/top`,
    headers: {
      'Client-ID': CLIENT_ID,
      Accept: 'application/vnd.twitchtv.v5+json'
    }
  },
  (error, response, body) => {
    if (error) return console.log(error)

    try {
      const data = JSON.parse(body)

      const topData = data.top
      for (let i = 0; i < topData.length; i += 1) {
        console.log(`${topData[i].viewers} ${topData[i].game.name}`)
      }
      return true
    } catch (e) {
      return console.log(e) // 錯誤處理
    }
  }
)
