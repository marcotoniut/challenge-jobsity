export interface Weekdata {
  start: number;
  end: number;
  month: Date;
}

export function getWeeks(date: Date): Array<Weekdata> {
  const weeks = [],
    firstDate = new Date(date.getFullYear(), date.getMonth(), 1),
    lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0),
    lastDateLastMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate(),
    numDays = lastDate.getDate();

  let start = 1;
  let end = 7 - firstDate.getDay();

  while (start <= numDays) {
    if (start === 1 && firstDate.getDay() !== 0) {
      start = lastDateLastMonth - 6 + end;
    }
    weeks.push({ month: date, start: start, end: end });
    start = end + 1;
    end = end + 7;
    if (end > numDays) {
      end = numDays;
    }
  }
  return weeks;
}
