const welcome_card = document.querySelector('.welcome_card')
const flash_cards = document.querySelector('.flash_cards')
const result = document.querySelector('.result')
const cards = document.querySelector('.cards')
const welcome_card_button = document.querySelector('.welcome_card_button')
const timeleft = document.querySelector('.timeleft')
const timer = document.querySelector('.timer p')

let lucky_card_number = null
let card_choosen = null
let time = 30             // seconds
let secoundLeft = time

let music = new Audio();
const playMusic = file => {
    music.pause();
    music = new Audio(file);
    music.play();
}

const flash_card_datas = [
    {
        id: 1,
        title: 'Flash Card 1',
        backgroundImage: 'https://images.unsplash.com/photo-1512618831669-521d4b375f5d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80'
    },
    {
        id: 2,
        title: 'Flash Card 2',
        backgroundImage: 'https://images.unsplash.com/photo-1578364249730-0c4ee16426fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
        id: 3,
        title: 'Flash Card 3',
        backgroundImage: 'https://images.unsplash.com/photo-1569826302896-9fc21fc56ac7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
        id: 4,
        title: 'Flash Card 4',
        backgroundImage: 'https://images.unsplash.com/photo-1559584048-57c0d9242004?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80'
    },
]

const lucky_card = {
    title: 'Lucky card',
    backgroundImage: 'http://www.sgbuyersguide.com/wp-content/uploads/2017/03/Happy-Woman.jpg'
}

const unLucky_card = {
    title: 'un-lucky Card',
    backgroundImage: 'https://pngimage.net/wp-content/uploads/2018/06/tristezza-inside-out-png-2.png'
}

welcome_card_button.addEventListener('click', e => {
    welcome_card.style.display = 'none'
    flash_cards.style.display = 'block'
    playMusic('audio/click.mp3')
    cards.innerHTML = createCards()
    single_card_flip()
    coundown()
})

const createRandomCardNumber = (data) => {
    let random = Math.floor(Math.random() * data.length)
    if(random !== 0 && random > data.length){
        random = random - 1;
    }
    return random
}

const createCards = () => {
    lucky_card_number = createRandomCardNumber(flash_card_datas)
    let html = ''
    flash_card_datas.forEach((card, index) => {
        let single_card = `
            <div class="card">
                <div class="card_front" style='background: url("${card.backgroundImage}");'>
                    <h2>${card.title}</h2>
                    <div class="buttons">
                        <div class="button_container">
                            <a href="#" class="btn effect flash_card_button" data-sm-link-text="Flip" data-card-id="${index}"><span>This one!</span></a>
                        </div>
                    </div>
                </div>
                <div class="card_back" style='background: url("${index === lucky_card_number ? lucky_card.backgroundImage : unLucky_card.backgroundImage}");'>
                    <h2>${index === lucky_card_number ? lucky_card.title : unLucky_card.title}</h2>
                    ${index === lucky_card_number ? "<p>Congratulations! you won the luckey card!</p>" : "Sorry! Bad luck. maybe next time :)"}
                </div>
            </div>
        `
        html += single_card
    })
    return html
}

const flip_all_cards = () => {
    const cards = document.querySelectorAll('.card')
    cards.forEach(card => card.classList.add('flipped'))
    
    lucky_card_number === card_choosen ? playMusic('audio/happy.mp3') : playMusic('audio/sad.mp3')
    setTimeout(showResult, 3000)
}

const single_card_flip = () => {
    const cards = document.querySelectorAll('.card')
    const flash_card_buttons = document.querySelectorAll('.flash_card_button')

    flash_card_buttons.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            playMusic('audio/click.mp3');
            cards[index].classList.add('flipped', 'choosen')
            card_choosen = Number(card.getAttribute('data-card-id'))
            setTimeout(flip_all_cards, 1000)
        })
    })
}

const showResult = (timeup = false) => {
    welcome_card.style.display = 'none'
    flash_cards.style.display = 'none'
    result.style.display = 'block'

    let template = `
        <h1>${timeup ? "Timeout :(" : (lucky_card_number === card_choosen ? "Woohoo!!!" : "Sorry :(")}</h1>
        <p>${timeup ? 
            "You failed to choose you <b>Flashcard</b> in time. maybe next time :)" : 
            (lucky_card_number === card_choosen ? "You won a <b>Lucky Flashcard</b>. Congratulations." : "Bad luck. maybe next time :)")}
        </p>
    `
    result.innerHTML = template
    clearInterval(coundown)
}

const coundown = () => setInterval(() => {
    if(lucky_card_number !== null && card_choosen === null){
        secoundLeft = secoundLeft - 1;
        if(secoundLeft > 0) timeleft.innerHTML = secoundLeft
        else {
            timer.innerHTML = "Time Up!!!"
            setTimeout(() => showResult(true), 2000)
        }
    }
}, 1000)
