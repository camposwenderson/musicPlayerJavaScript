const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// titulo da musica 
const songs = ['BewhY -GOTTASADAE', 'Mikrokosmos', 'Panic! At The Disco - Into the Unknown']


// faixa de músicas
let songIndex = 1

// iniciar musicas 
loadSong(songs[songIndex])

//atualizar detalhes da música
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Tocas musica
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play()
}
// Pausar musica
function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

// Musica anterior
function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])

    playSong()
}

// Proxima musica
function nextSong() {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

// Atualizar barra de progresso
function updateprogress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

// Definir barra de progresso
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

//event listener
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})


//Trocar musica 
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Atualização de tempo / música
audio.addEventListener('timeupdate', updateprogress)

// Clique na barra de progresso
progressContainer.addEventListener('click', setProgress)

// Final da musica
audio.addEventListener('ended', nextSong)