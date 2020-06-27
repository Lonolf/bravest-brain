import moment from 'moment'

export const checkStoreOpen = ({ store: { timeSlots }, time = moment() }) => {
  if (timeSlots == null || typeof timeSlots !== 'object')
    return false

  const todayISOWeek = time.isoWeekday()

  if (timeSlots[todayISOWeek] == null)
    return false

  for (let { start, end } of timeSlots[todayISOWeek])
    if (time.isSameOrAfter(moment(time).hours(start.split(':')[0]).minutes(start.split(':')[1])) &&
      time.isSameOrBefore(moment(time).hours(end.split(':')[0]).minutes(end.split(':')[1])))
      return true

  return false
}

export const getNextOpeningTime = ({ store: { timeSlots }, time = moment() }) => {
  if (timeSlots == null || typeof timeSlots !== 'object')
    return 'noOpeningTimeFoundToday'

  const todayISOWeek = time.isoWeekday()
  if (timeSlots[todayISOWeek] == null)
    return 'noOpeningTimeFoundToday'

  for (let timeSlot of timeSlots[todayISOWeek])
    if (time.isSameOrBefore(moment(timeSlot.start, 'HH:mm')) && time.isSameOrBefore(moment(timeSlot.end, 'HH:mm')))
      return timeSlot.start

  return 'noOpeningTimeFoundToday'
}

export const extractTimeSlots = ({ store: { timeSlots } = {}, date = moment() }) => {
  if (timeSlots == null || typeof timeSlots !== 'object')
    return []

  const todayISOWeek = date.isoWeekday()
  if (timeSlots[todayISOWeek] == null)
    return []

  return timeSlots[todayISOWeek].map(({ start, end }) => {
    if (end === '23:59') {
      const nextDay = todayISOWeek === 7 ? 1 : todayISOWeek + 1
      const nightSlot = timeSlots[nextDay]
        .filter(timeSlot => timeSlot.start === '00:00')[0]
      if (nightSlot !== null)
        return start + ' - ' + nightSlot.end
    }

    return start + ' - ' + end
  })
}
