function showTime() {
    const time = document.querySelector('.time');
    const currentTime = new Date().toLocaleTimeString();
    time.textContent = currentTime
    setTimeout(showTime, 1000);
    setTimeout(showDate, 1000);
    setTimeout(showGreeting, 1000);
    // setTimeout(getQuotes, 600000);
    // setTimeout(setBg, 1000);
};
showTime()
function showDate() {
    const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','friday','saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentDay = new Date().getDay();
    const currentMonth = new Date().getMonth();
    const currentDateNumber = new Date().getDate()
    const date = document.querySelector('.date');
    
    const currentDate = `${week[currentDay]}, ${months[currentMonth]} ${currentDateNumber}`;
    date.textContent = currentDate;

};
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let number = String(Math.floor(Math.random() * (max - min + 1)) + min); //Максимум и минимум включаются
    if (number.length < 2) {
        number = '0' + number
    }
    return number
}
function getTimeOfday() {
    const hours = new Date().getHours();
    let timeOfDay = '';
    if (hours >= 6 && hours < 12) {
        timeOfDay = 'morning';
    } else if (hours >= 12 && hours < 18) {
        timeOfDay = 'athernoon';
    } else if (hours >= 18 && hours < 24) {
        timeOfDay = 'evening';
    } else if (hours >= 0 || hours < 6) {
        timeOfDay = 'night';
    }
    return timeOfDay
}
function showGreeting() {
    const greeting = document.querySelector('.greeting')
    greeting.textContent = `Good ${getTimeOfday()}`
}
showGreeting()
const name = document.querySelector('.name')
function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('cityChange', cityChange.value);

}
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('cityChange')) {
        cityChange.value = localStorage.getItem('cityChange');
    }else{
        cityChange.value = 'Minsk'
    }
    getWeather()
}
window.addEventListener('load', getLocalStorage)
let randomNumber = getRandomIntInclusive(0, 20)
function setBg() {
    let body = document.querySelector('body')
    if (String(randomNumber).length < 2) {
        randomNumber = '0' + String(randomNumber)
    }
    let bgNum = randomNumber;
    const timeOfDay = getTimeOfday()
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;// здесь ваш код 
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`
    };
}

setBg()
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
function getSlideNext() {
    if (Number(randomNumber) >= 20) {
        randomNumber = "00"
    }
    randomNumber = Number(randomNumber) + 1
    if (String(randomNumber).length < 2) {
        randomNumber = '0' + String(randomNumber)
    }
    setBg()
}
function getSlidePrev() {
    if (Number(randomNumber) === 1) {
        randomNumber = "21"
    }
    randomNumber = Number(randomNumber) - 1
    if (String(randomNumber).length < 2) {
        randomNumber = '0' + String(randomNumber)
    }
    setBg()
}
slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)


const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const cityChange = document.querySelector('.city')
const city404 = document.querySelector('.weather-error')
cityChange.addEventListener('change', getWeather)
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityChange.value}&lang=en&appid=a7680f8c766c144d9631b522c6e1db88&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.cod !== '404'){
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
        city404.textContent = ''
    }else{
        weatherIcon.removeAttribute('class')
        weatherIcon.classList.remove('owf')
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = ''
        humidity.textContent = '';
        city404.textContent = data.message
    }
}
const quoteRefreshButton = document.querySelector('.change-quote')
const quote = document.querySelector('.quote')
const quoteAuthor = document.querySelector('.author')
quoteRefreshButton.addEventListener('click', getQuotes)
async function getQuotes() {
    const number = Number(getRandomIntInclusive(0, 2))
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[number].text

    quoteAuthor.textContent = data[number].author
}
getQuotes()

let isPlay = false;
let audioNumber = Number(getRandomIntInclusive(0,3));
import playList from './playList.js';
const playButton = document.querySelector('.play');
const nextButton = document.querySelector('.play-next');
const prevButton = document.querySelector('.play-prev');
const audio = new Audio();
function playAudio(){
 playButton.classList.toggle('pause')
    if (!isPlay) {
        console.log(audioNumber)
        // audio.src = '../assets/sounds/Ennio Morricone.mp3'
        audio.src = playList[audioNumber].src
        audio.currentTime = 0;
        audio.play();
        // playButton.classList.add('pause')
        isPlay = true
    } else {
        audio.pause()
        // playButton.classList.remove('pause')
        isPlay = false
    }
}
function playNextAudio(){
    isPlay = true
    audioNumber++
        // const old = document.querySelector('.play-item_active')
        // if(old != null){
        //     old.classList.remove('play-item_active')
        // }
        
        // playList[audioNumber].classList.add('play-item_active')
    audio.src = playList[audioNumber].src
        audio.currentTime = 0;
        audio.play();
        isPlay = true
        if(!playButton.classList.contains('pause')){
            playButton.classList.add('pause')

        } 
}
function playPrevAudio(){
    isPlay = true
    if(audioNumber===0){
        audioNumber = 4
    }else{
    audioNumber--
    }
    audio.src = playList[audioNumber].src
        audio.currentTime = 0;
        audio.play();
        isPlay = true
        if(!playButton.classList.contains('pause')){
            playButton.classList.add('pause')

        } 
}

playButton.addEventListener('click', playAudio)
prevButton.addEventListener('click', playPrevAudio);
nextButton.addEventListener('click', playNextAudio);


playList.forEach(function(el){
    const playListContainer = document.querySelector('.play-list') 
    const audioElement = document.createElement('li');
audioElement.classList.add('play-item');
audioElement.textContent = el.title;
playListContainer.append(audioElement)
audioElement.addEventListener("click", function (e) {
    const old = document.querySelector('.play-item_active')
    if(old != null){
        old.classList.remove('play-item_active')
    }
    
    audioElement.classList.add('play-item_active')
    audio.src = el.src
        audio.currentTime = 0;
        audio.play();
        isPlay = true
        if(!playButton.classList.contains('pause')){
            playButton.classList.add('pause')
        } 
});
})



// playList.addEventListener('click', playAudio)
console.log(playList)



