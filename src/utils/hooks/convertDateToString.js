import moment from 'moment';

function convertDateToString(dateString) {
  const dateTime = moment(dateString, moment.ISO_8601).add(9, 'h').millisecond(0);
  const now = moment();
  const diff = now.diff(dateTime);
  const calDuration = moment.duration(diff);
  const years = calDuration.years();
  const months = calDuration.months();
  const days = calDuration.days();
  const hours = calDuration.hours();
  const minutes = calDuration.minutes();

  if (years === 0 && months === 0 && days === 0 && hours === 0) {
    return `${minutes}분 전`;
  }
  if (years === 0 && months === 0 && days === 0) {
    return `${hours}시간 전`;
  }
  if (years === 0 && months === 0) {
    return `${days}일 전`;
  }
  return `${dateTime.format('YYYY-MM-DD HH:mm')}`;
}

export default convertDateToString;
