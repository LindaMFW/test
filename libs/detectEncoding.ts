import languageEncoding from 'detect-file-encoding-and-language'

import Encoding from 'encoding-japanese'

export const encodingType = async (dataString: string): Promise<string | null> => {
  const content = Buffer.from(dataString)
  const fileInfo = await languageEncoding(content)
  const encodingType: string | null = fileInfo.encoding
  return Promise.resolve(encodingType)
}

export const decodingShiftjis = async (dataString: string): Promise<string | null> => {
  const sjisBuffer = Encoding.stringToCode(dataString)

  const unicodeArray = Encoding.convert(sjisBuffer, {
    to: 'UNICODE',
    from: 'SJIS',
  })

  const strConveter = Encoding.codeToString(unicodeArray)

  return Promise.resolve(strConveter)
}

export const decodingShiftjisFromBufferString = async (data: Buffer): Promise<string> => {
  try {
    const decoder = new TextDecoder('shift_jis')
    const r = decoder.decode(data)
    return Promise.resolve(r)
  } catch (e) {
    return Promise.reject('Unable to decode ' + e.message)
  }
}
