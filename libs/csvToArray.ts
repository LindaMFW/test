export async function csvToArray(str: string | null, delimiter = ',') {
  if (str === null) {
    return []
  }
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter)
  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row

  let rows = new Array<string>()
  rows = str.slice(str.indexOf('\n') + 1).split('\n')
  rows.pop()

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array

  const arr = rows.map(function (row) {
    const values = row.split(delimiter)
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index]
      return object
    }, {})
    return el
  })

  // return the array
  return arr
}
