const dateToDDMMYY = (date) => {
  const yyyy = date.getFullYear()
  let mm = date.getMonth() + 1 // Months start at 0!
  let dd = date.getDate()

  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`

  const formatted = `${dd}/${mm}/${yyyy}`
  return formatted
}
const DDMMYYToDate = (dateString) => {
  const dateParts = dateString.split('/')
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
  return dateObject
}

function ExcelDateToJSDate(serial) {
  const utcDays = Math.floor(serial - 25569)
  const utcValue = utcDays * 86400
  const dateInfo = new Date(utcValue * 1000)

  const fractionalDay = serial - Math.floor(serial) + 0.0000001

  let totalDeconds = Math.floor(86400 * fractionalDay)

  const seconds = totalDeconds % 60

  totalDeconds -= seconds

  const hours = Math.floor(totalDeconds / (60 * 60))
  const minutes = Math.floor(totalDeconds / 60) % 60

  return new Date(
    dateInfo.getFullYear(),
    dateInfo.getMonth(),
    dateInfo.getDate(),
    hours,
    minutes,
    seconds,
  )
}

export { dateToDDMMYY, DDMMYYToDate, ExcelDateToJSDate }
