const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function isPrime(n) {
  if (n === 1) return false // edge case
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) return false // 除了 1 和該數自身以外，若能被其他自然數整除，則非質數
  }
  return true
}

function solve(line) {
  for (let i = 1; i < line.length; i += 1) {
    console.log(isPrime(Number(line[i])) ? 'Prime' : 'Composite')
    // 三元運算子：若 isPrime() return true，印出 'Prime'，否則印出 'Composite'
  }
}

rl.on('close', () => solve(lines))
