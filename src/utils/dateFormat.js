function getFormatDate(date) {
  var year = date.getFullYear();
  var month = 1 + date.getMonth();
  month = month > 10 ? month : '0' + month;
  var day = date.getDate();
  day = day > 10 ? day : '0' + day;
  var hours = date.getHours();
  hours = hours > 10 ? hours : '0' + hours;
  var minutes = date.getMinutes();
  minutes = minutes > 10 ? minutes : '0' + minutes;
  var seconds = date.getSeconds();
  seconds = seconds > 10 ? seconds : '0' + seconds;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} `;
}
