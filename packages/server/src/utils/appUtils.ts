export const handleOnError = (port, error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

export const handleOnListening = (server) => {
  const address = server.address()
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port
  console.log('Server running at ' + bind)
}
