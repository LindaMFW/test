import fs from 'fs'
import path from 'path'
import * as json2Csv from 'json-2-csv'

export const jsonTocsv = async (jsonData, csvOutputName: string = 'data.csv'): Promise<string | null> => {
  const file = path.resolve(path.join(__dirname, '../resources/data/'), csvOutputName)
  try {
    const csvData = await json2Csv.json2csv(jsonData)
    fs.writeFileSync(file, csvData)
    return Promise.resolve(csvOutputName)
  } catch (err) {
    return Promise.reject(err.message)
  }
}
