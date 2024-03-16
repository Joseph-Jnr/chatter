import React from 'react'

type DateFormatType =
  | 'fullDate'
  | 'fullDateTime'
  | 'datePipeTime'
  | 'dateDashTime'
  | 'shortDate'
  | 'timeAgo'

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
      case 'timeAgo':
        const now = new Date()
        const seconds = Math.floor(
          (now.getTime() - dateObject.getTime()) / 1000
        )
        const intervals = {
          year: Math.floor(seconds / 31536000),
          month: Math.floor(seconds / 2592000),
          week: Math.floor(seconds / 604800),
          day: Math.floor(seconds / 86400),
          hour: Math.floor(seconds / 3600),
          minute: Math.floor(seconds / 60),
        }

        if (intervals.year > 0) {
          return intervals.year === 1
            ? '1 year ago'
            : `${intervals.year} years ago`
        } else if (intervals.month > 0) {
          return intervals.month === 1
            ? '1 month ago'
            : `${intervals.month} months ago`
        } else if (intervals.week > 0) {
          return intervals.week === 1
            ? '1 week ago'
            : `${intervals.week} weeks ago`
        } else if (intervals.day > 0) {
          return intervals.day === 1 ? '1 day ago' : `${intervals.day} days ago`
        } else if (intervals.hour > 0) {
          return intervals.hour === 1
            ? '1 hour ago'
            : `${intervals.hour} hours ago`
        } else if (intervals.minute > 0) {
          return intervals.minute === 1
            ? '1 minute ago'
            : `${intervals.minute} minutes ago`
        } else {
          return 'just now'
        }
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
