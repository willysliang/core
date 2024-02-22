fetch('http://localhost:3000/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    account: '4',
    email: '4',
    password: '4',
    phone: '4',
    name: '4',
  }),
})
  .then((response) => response.json())
  .then((result) => {
    console.log('fetch', result)
  })
  .catch((error) => {
    console.error(error)
  })
