console.log('hello')
var play = document.getElementById('play')
play.addEventListener('click', function (){
    window.location.assign("./game.html")
})

var username = localStorage.getItem()
var highscores = localStorage.getItem()

var score = document.createElement('li')
score.innerText = "username: " + username + " score: " + highscores
document.getElementById('hs').appendChild(score)

console.log(highscores)
console.log(username)