export function changeTime(time){
  const year = time.getFullYear();
  const month = (time.getMonth() + 1 < 10) ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute 
  return result;
}