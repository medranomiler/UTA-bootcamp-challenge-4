const username = document.getElementById('username')
const submitBtn = document.getElementById('submit')
const scoreDisplayed = document.getElementById('score')
const gameScore = localStorage.getItem('score')
scoreDisplayed.innerText = gameScore
const hsList = document.getElementById('hs-list')

const highscores = JSON.parse(localStorage.getItem('highscores')) || [];



function saveHighScore(event){
    if(username.value === ''){
        alert("A username must be entered")
        return;
    }
    else if (username.value === 'username'){
        alert("A username cannot be 'username'")
        return;
    }

    event.preventDefault();

    const score = {
        score: gameScore,
        name: username.value
    };
    highscores.push(score)
    highscores.sort( (a,b) => b.score - a.score)
    highscores.splice(5);

    localStorage.setItem('highscores', JSON.stringify(highscores))

    
}

submitBtn.addEventListener('click', saveHighScore)

function getHighscores(){
    hsList.innerHTML = highscores.map(
        score => {
            return `<li id="high-score">${score.name} - ${score.score}</li>`
        }).join('');
}
getHighscores()



var play = document.getElementById('play')
play.addEventListener('click', function (){
    window.location.assign("./game.html")
})
