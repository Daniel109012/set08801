class AudioController {
    constructor() {
        this.bgMusic = new Audio('Audio/BGmusic.mp3');
        this.flipSound = new Audio('Audio/FlipCard.wav');
        this.matchSound = new Audio('Audio/Match.wav');
        this.fasterSound = new Audio('Audio/Faster.mp3')
        this.victorySound = new Audio('Audio/Victory.wav');
        this.gameOverSound =  new Audio('Audio/GameOver.wav');
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.fasterSound.pause();
        this.bgMusic.currentTime = 20;
        this.fasterSound.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    faster() {
        this.stopMusic();
        this.fasterSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MatchGame {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.showCard();

            this.busy = false;
        },2000);
        this.hideCard();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }


    hideCard() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('mached');
        });
    }

    showCard() {
        this.cardsArray.forEach(card => {
            card.classList.add('visible');
        });
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add("visible");

            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else 
                this.cardToCheck = card;
        }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMisMatch(card1, card2){
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy =false;
        }, 500);
    }

    getCardType(card) {
        return card.getElementsByClassName('front-block')[0].src;
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 99)
                this.hideCard();
            if(this.timeRemaining === 20)
                this.audioController.faster();
            if(this.timeRemaining === 0)
                this.gameOver();
        },1000);
            
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }

    shuffleCards() {
        for(let i = 0; i < this.cardsArray.length; i++) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
        
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MatchGame(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        },2000);
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

let audioController = new AudioController();