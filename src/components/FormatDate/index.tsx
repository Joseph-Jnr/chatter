import React from 'react'

type DateFormatType =
  | 'fullDate'
  | 'fullDateTime'
  | 'datePipeTime'
  | 'dateDashTime'
  | 'shortDate'

interface FormatDateProps {
  data: string
  formatType: DateFormatType
}

const FormatDate: React.FC<FormatDateProps> = ({ data, formatType }) => {
  const formatDate = (date: string, type: DateFormatType): string => {
    const dateObject = new Date(date)

    const formattedTime = dateObject.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const day = dateObject.getDate()
    const month = dateObject.toLocaleString('en-US', { month: 'long' })
    const shortMonth = dateObject.toLocaleString('en-US', { month: 'short' })
    const digitMonth = dateObject.toLocaleString('en-US', { month: '2-digit' })
    const year = dateObject.getFullYear()

    switch (type) {
      case 'fullDate':
        return `${day}th ${shortMonth} ${year}`
      case 'fullDateTime':
        return `${day}th ${month} ${year} at ${formattedTime}`
      case 'datePipeTime':
        return `${day}th ${shortMonth} ${year} | ${formattedTime}`
      case 'dateDashTime':
        return `${day} - ${digitMonth} - ${year} | ${formattedTime}`
      case 'shortDate':
        return `${day} - ${digitMonth} - ${year}`
      default:
        return date
    }
  }

  // Expected result based on type

  // FULL_DATE: '10th Aug 2023'
  // FULL_DATE_TIME: '10th August 2023 at 10:56am'
  // DATE_PIPE_TIME: '10th Aug 2023 | 10:56am'
  // DATE_DASH_TIME: '10 - 08 - 2023 | 10:56am'
  // SHORT_DATE: '10 - 08 - 2023'

  return formatDate(data, formatType)
}

export default FormatDate
