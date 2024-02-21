fetch('http://localhost:3000/user/userinfo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    account: '3',
    email: '3',
    password: '3',
  }),
})
  .then((response) => response.json())
  .then((result) => {
    console.log('fetch', result)
  })
  .catch((error) => {
    console.error(error)
  })
