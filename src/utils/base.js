export const getInteger = (num) => {
  return Number(Math.trunc(num).toString().length === '1' ? `0${Math.trunc(num)}` : Math.trunc(num))
}

export const getFraction = (num) => {
  return Number(num.toString().split('.')[1]) || 0
}

export const getDate = () => {
  const date = new Date()
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours() + 1,
    minute: date.getMinutes() + 1,
    second: date.getSeconds() + 1
  }
}

export const getMonthWord = (month) => {
  const map = {
    1: 'Jan.',
    2: 'Feb.',
    3: 'Mar.',
    4: 'Apr.',
    5: 'May.',
    6: 'Jun.',
    7: 'Jul.',
    8: 'Aug.',
    9: 'Sep.',
    10: 'Oct.',
    11: 'Nov.',
    12: 'Dec.'
  }
  return map[month]
}
