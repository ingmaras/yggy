const readline = require('readline')

export const waitForKeys = (
  successfulKey: string,
  failureKey: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    readline.emitKeypressEvents(rl.input)
    rl.input.setRawMode(true)

    process.stdin.on('keypress', (str, key) => {
      // console.log({ str, key })
      if (key.name === successfulKey || key.name === failureKey) {
        rl.close()
        if (key.name === successfulKey) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}
