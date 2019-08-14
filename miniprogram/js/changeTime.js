export function changeTime(time){
  const year = time.getFullYear();
  const month = (time.getMonth() + 1 < 10) ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
  const day = (time.getDate() < 10) ? ('0' + time.getDate()) : time.getDate();
  const hour = (time.getHours() < 10) ? ('0' + time.getHours()) : time.getHours();
  const minute = (time.getMinutes() < 10) ? ('0' + time.getMinutes()) : time.getMinutes();
  const result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute 
  return result;
}