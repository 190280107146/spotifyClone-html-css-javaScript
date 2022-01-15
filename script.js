console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('/spotifyClone-html-css-javaScript/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Jugnu(Pagalworld.pw)", filePath: "/spotifyClone-html-css-javaScript/songs/1.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/1.jpg"},
    { songName: "Oo Bolega ya Oo Oo Bolega", filePath: "/spotifyClone-html-css-javaScript/songs/2.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/2.jpg"},
    {songName: "Rataan Lambiyan", filePath: "/spotifyClone-html-css-javaScript/songs/3.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/3.jpg"},
    {songName: "Dance Meri Rani", filePath: "/spotifyClone-html-css-javaScript/songs/4.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/4.jpg"},
    {songName: "Chand wala mukhda leke", filePath: "/spotifyClone-html-css-javaScript/songs/5.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/5.jpg"},
    {songName: "Mohabbat hai", filePath: "/spotifyClone-html-css-javaScript/songs/2.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/6.jpg"},
    {songName: "Meri jindgi hai tu", filePath: "/spotifyClone-html-css-javaScript/songs/2.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/7.jpg"},
    {songName: "Saami Saami", filePath: "/spotifyClone-html-css-javaScript/songs/2.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/8.jpg"},
    {songName: "tumse jyda tumse pyar kiya", filePath: "/spotifyClone-html-css-javaScript/songs/2.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/9.jpg"},
    {songName: "Shrivalli", filePath: "/spotifyClone-html-css-javaScript/songs/4.mp3", coverPath: "/spotifyClone-html-css-javaScript/covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        element = Array.from(document.getElementsByClassName('songItemPlay'))[0];
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if(audioElement.paused && audioElement.currentTime<=0){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else if(audioElement.paused){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = myProgressBar.value;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    element = Array.from(document.getElementsByClassName('songItemPlay'))[songIndex];
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    element = Array.from(document.getElementsByClassName('songItemPlay'))[songIndex];
    element.classList.remove('fa-play-circle');
    element.classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    element = Array.from(document.getElementsByClassName('songItemPlay'))[songIndex];
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    element = Array.from(document.getElementsByClassName('songItemPlay'))[songIndex];
    element.classList.remove('fa-play-circle');
    element.classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
