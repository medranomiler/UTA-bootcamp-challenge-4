function getScore() {
    var score = document.location.search.split("=")[1]
    document.getElementById('score').innerText = score;
    document.getElementById('submit').addEventListener('click', function(){
    var username = document.getElementById('username').value
    localStorage.setItem(username, score )
    window.location.assign("./highscores.html")
    })
}


getScore();

