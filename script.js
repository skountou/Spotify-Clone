const musicContainer = document.querySelector('.music-container')
const shufflebtn = document.querySelector('#shufflebtn')
const prevbtn = document.querySelector('#prevbtn')
const playbtn = document.querySelector('#playbtn')
const pausebtn = document.querySelector('#pausebtn')
const nextbtn = document.querySelector('#nextbtn')
const repeatbtn = document.querySelector('#repeatbtn')
const volumecontrol = document.querySelector('#volume-control')


const audio = document.querySelector('#audio')
const progressbar = document.querySelector('.progress-bar')
const progressbarContainer = document.querySelector('.progress-container')
const title = document.querySelector('#song-title')
const cover = document.querySelector('#cover')


fetch("./tracks.json")
    .then(function(resp){
        return resp.json();
    });




//Array of songs whilst we don't load from json
const songs = ['acousticbreeze','anewbeginning','buddy','creativeminds','cute','goinghigher','happyrock','hey','jazzyfrenchy','littleidea','memories','ukulele']

//Initial value for index
let songIndex =2

//Initial song load
loadSong(songs[songIndex])

//Song Info Update
function loadSong(song) {
    title.innerText = song
    audio.src = `tracks/${song}.mp3`
    cover.src = `tracks/thumbnails/${song}.jpg`
}


//Play and Pause 
function playSong(){
    musicContainer.classList.add('play')
    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    audio.pause()
}

//Next and Prev
function prevSong(){
    songIndex--

    if (songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong(){
    songIndex++

    if (songIndex > songs.length -1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progresspercentage = (currentTime / duration) * 100
    progressbar.style.width = `${progresspercentage}%`
}

function songSeek(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

function shuffleSongs(){
    let value = Math.floor(Math.random() * songs.length);
    songIndex = value
    loadSong(songs[songIndex])
    playSong()
}

function setVolume(){
    audio.volume = (volumecontrol.value) / 100
}



//EVENTS
playbtn.addEventListener('click',() => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    } else {
        playSong()
    }
})



prevbtn.addEventListener('click', prevSong)
nextbtn.addEventListener('click', nextSong)
shufflebtn.addEventListener('click', shuffleSongs)

progressbarContainer.addEventListener('click', songSeek)

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', nextSong)

volumecontrol.addEventListener('mousemove', setVolume)

repeatbtn.addEventListener('click', () => {
    audio.addEventListener('ended',playSong)
})

// var tracks = JSON.parse(data);
// alert(tracks[0].title);