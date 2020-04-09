console.log('connected')

let count2 = 15
//every second, countdown by one
let countdown2 = () =>{
  setInterval(function() {
    count2--
  }, 1000)
}

countdown2();
