const name = 'John Serrano'
console.log(name)

const a = 10
const b = 20

console.log(a + b)

function sum(a, b) {
  return a + b
}

console.log(sum(5, 3))

const numbers = [1, 2, 3, 4, 5]

const double = numbers.map(number => number * 2)
console.log(double)

const date = new Date()
console.log(date.toLocaleTimeString())

async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  return data
}

getUsers().then(users => {
  console.log(users)
})
