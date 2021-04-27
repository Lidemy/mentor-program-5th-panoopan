// 需考慮題目範圍：數字太大的情況下，用 Number 處理會出問題，因此應該以 String 的邏輯解題
// 在 JavaScript 中，最大正整數為 25^3 - 1

const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function solve(line) {
  const m = Number(lines[0])
  for (let i = 1; i <= m; i++) {
    const [a, b, p] = lines[i].split(' ')

    if (BigInt(a) === BigInt(b)) {
      console.log('DRAW')
    } else if ((BigInt(a) > BigInt(b) && p === 1) || (BigInt(a) < BigInt(b) && p === -1)) {
      console.log('A')
    } else {
      console.log('B')
    }
  }
}

rl.on('close', () => solve(lines))
