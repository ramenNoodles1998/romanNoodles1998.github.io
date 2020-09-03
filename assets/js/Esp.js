let cardStack = [ 'Circle', 
                    'Plus',
                    'Waves', 
                    'Square', 
                    'Star']
let score = 0
let count = 0

let randomCard

document.addEventListener('DOMContentLoaded', function() {
    shuffle(cardStack)
    document.querySelector('.score').innerHTML = '<h1>0/10</h1>'

    document.querySelector('.play-game-btn').onclick = () => {
        document.querySelector('.play-game-btn').style.display = 'none'     
        document.querySelector('.shape-btns').style.display = 'flex'  
        document.querySelector('.next-btn').style.display = 'block'  
        randomCard = cardStack[Math.floor(Math.random()*5)]  
    }

    document.querySelectorAll('.btn-secondary')[0].onclick = secondaryButtonsFunc

    document.querySelectorAll('.btn-secondary')[1].onclick = secondaryButtonsFunc

    document.querySelectorAll('.btn-secondary')[2].onclick = secondaryButtonsFunc

    document.querySelectorAll('.btn-secondary')[3].onclick = secondaryButtonsFunc

    document.querySelectorAll('.btn-secondary')[4].onclick = secondaryButtonsFunc

    document.querySelector('.next-btn').onclick = () => {
        document.querySelector('.magic-card').style.display = 'block'
        document.querySelector(`.${randomCard.toLowerCase()}`).style.display = 'none'
        randomCard = cardStack[Math.floor(Math.random()*5)]
    }  
})

function secondaryButtonsFunc() {
    cardReveal()
    if(count < 9) {
        if(randomCard === this.innerHTML) {
            //play pleasent song
            document.querySelector('#successSound').play()

            score++
            document.querySelector('.score').innerHTML = `<h1>${score}/10</h1>`
        } else {
            window.navigator.vibrate(200)
            console.log(window.navigator.vibrate)
            //vibrate if wrong
        }
    } else {
        if(randomCard === this.innerHTML) {
            //play pleasent song
            document.querySelector('#successSound').play()

            score++
            document.querySelector('.score').innerHTML = `<h1>${score}/10</h1>`
        } else {
            window.navigator.vibrate(200);
            console.log(window.navigator.vibrate)
            //vibrate if wrong
        }
        endGame()
    }
   
    count++
}

function cardReveal() {
    document.querySelector('.magic-card').style.display = 'none'
    document.querySelector(`.${randomCard.toLowerCase()}`).style.display = 'block'
}

function endGame() {
    document.querySelector('.next-btn').style.backgroundColor = 'white'
    document.querySelector('.next-btn').style.color = 'black'
    document.querySelector('.next-btn').innerHTML = score > 5 ? `You have ESP! Total: ${score}/10` : `Sorry, you don't have ESP. Total: ${score}/10`
    document.querySelector('.next-btn').onclick = () => {}
    document.querySelector('.shape-btns').style.display = 'none'
    console.log('game over')
}

//from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    let counter = array.length

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter)

        // Decrease counter by 1
        counter--

        // And swap the last element with it
        let temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
    }

    return array;
}
