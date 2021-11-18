export default function (T){
  function compDate(n){
    return n.toString().padStart(2,'0')
  }
  const date = new Date(T)
  const year = date.getFullYear()
  const mouse = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const mins = date.getMinutes()
  const second = date.getSeconds()
  const week = date.getDay()
  const arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
  let res = ''
  res = `${year}-${compDate(mouse)}-${compDate(day)} ${compDate(hour)}:${compDate(mins)}:${compDate(second)} ${arr[week]}`
  return res
}
