async function getUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  return data
}

getUser().then(users => {
  console.log(users)
})

const name2 = 'John Serrano'
console.log(name2)

const person = {
  name: 'John',
  age: 30,
  city: 'New York',
}

person
