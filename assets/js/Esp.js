//I have no clue why this works with var and not let
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
let cardStack = [ 'circle', 'circle', 'circle', 'circle', 'circle', 
                    'plus', 'plus', 'plus', 'plus', 'plus',
                    'waves', 'waves', 'waves', 'waves', 'waves', 
                    'square', 'square', 'square', 'square', 'square', 
                    'star', 'star', 'star', 'star', 'star']
let score = 0

$(function() {
    shuffle(cardStack)
    let shapes = [ 'circle', 'plus', 'waves', 'square', 'star']
    let grammar = '#JSGF V1.0; grammar shapes; public <shapes> = ' + shapes.join(' | ') + ' ;'
    let recognition = new SpeechRecognition()
    let speechRecognitionList = new SpeechGrammarList()
    speechRecognitionList.addFromString(grammar, 1)
    recognition.continuous = true
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 2

    $('.play-game-btn').click(() => {
        $('#start')[0].play()
        $('.play-game-btn').hide()
        recognition.start()
    })

    recognition.onresult = function(event) {
        let shape = event.results[event.results.length-1][0].transcript
        shape = shape.replace(/\s/g, '')

        if(cardStack.length > 0) {
            cardStack[0] = cardStack[0].replace(/\s/g, '')
            if(shape.toLowerCase() === cardStack[0].toLowerCase()) {
                score++
            }

            cardReveal()
        } else {
            //run ending voice line based on score
            if(score > 10) {
                $('#success')[0].play()
            } else {
                $('#loss')[0].play()
            }
        }
        $('#start')[0].pause()
    }
})

function cardReveal() {
    const timeoutMS = 2000

    $('.magic-card').css('background-color', 'white')
    $(`.${cardStack[0]}`).css('display', 'block')
    //play voice line next
    setTimeout(() => {
        $('#next')[0].play()
        $('.magic-card').css('background-color', 'rgb(63, 58, 58)')
        $(`.${cardStack[0]}`).css('display', 'none')
        cardStack.shift()
    }, timeoutMS)
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
