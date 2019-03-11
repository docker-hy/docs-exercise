const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const close = (version) => () => {
  const message = {
    "close": "Closing now",
    "exit": "Exiting now",
    "quit": "Quitting now",
    "empty": "Empty string was given, quitting now. Input help for more info"
  }
  console.log(message[version])
  return false
}

const help = () => () => {
  console.log('Input exit to exit, quit to quit or close to close. You can also give empty string to quit')
  return true
}

const victory = () => () => {
  console.log('You found the correct password. Secret message is:\n"This is the secret message"')
  return false
}

const KNOWN_INPUTS = {
  "exit": close('exit'),
  "close": close('close'),
  "quit": close('quit'),
  "": close('empty'),
  "help": help(),
  "basics": victory()
}


const handlePassword = (password) => {
  const keepGoing = KNOWN_INPUTS[password.toLowerCase()]
  if (keepGoing === undefined) {
    console.log(`${password} is not the correct password, please try again`)
    return true
  }
  return keepGoing()
}

const askPassword = () => new Promise(resolve => rl.question('Give me the password: ', (p) => resolve(p)))

const passwordLoop = async () => {
  let keepAsking = true
  while (keepAsking) {
    const password = await askPassword()
    keepAsking = handlePassword(password)
    console.log('')
  }
  rl.close()
}

passwordLoop()
