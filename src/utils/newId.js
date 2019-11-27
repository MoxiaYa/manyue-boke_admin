export function getNewId() {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth()
  var date = now.getDate()
  var hour = now.getHours()
  var min = now.getMinutes()
  var second = now.getSeconds()
  var i = randomNum(10, 99)
  // var id = `${year}${month + 1}${date}${hour}${min}${second}${i}`
  // console.log('aaa' + id)
  // return id
}

export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)

    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)

    default:
      return 0
  }
}
