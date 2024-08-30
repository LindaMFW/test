import fs from 'fs'
import path from 'path'

export const randomString = (len: number, charSet?: string): Promise<string> => {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString: string = ''
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length)
    randomString += charSet.substring(randomPoz, randomPoz + 1)
  }
  return Promise.resolve(randomString)
}

export const randomInterger = (min: number, max: number): Promise<number> => {
  let randomInt: number = Math.floor(Math.random() * (max - min + 1) + min)
  return Promise.resolve(randomInt)
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const lastest_transaction_from = (): Promise<string> => {
  const now = new Date()
  return Promise.resolve(now.toLocaleDateString())
}

export async function deleteAllFilesInDir(dirPath: string) {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, `../${dirPath}`))
    const deleteFilePromises = files.map((file) => fs.promises.unlink(path.join(dirPath, file)))
    await Promise.all(deleteFilePromises)
  } catch (err) {
    console.log(err)
  }
}

export async function createDirectory(dirPath: string) {
  const pathStr = path.join(__dirname, `../${dirPath}`)
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr, { recursive: true })
  }
}
