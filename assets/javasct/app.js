const song = document.getElementById("song");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".music--song");

const playbtn = document.querySelector(".control--play");
const iconplay = document.querySelector(".control--inner");
const nextbtn = document.querySelector(".control--next");
const prevbtn = document.querySelector(".control--back");
const infiBtn = document.querySelector(".control--infinite");
const repeatBtn = document.querySelector(".control--repeat");

const musicName = document.querySelector(".music--name");
const musicAuth = document.querySelector(".music--auth");
const musicThumb = document.querySelector(".music--thumb");
const musicImg = document.querySelector(".music--thumb img");

let isPlaying = true;
let indexSong = 0;
let timer = 0;
let infinite = true;
let repeat = false;
const musics = ["aino.mp3","chvtx.mp3","devuong.mp3"];

// defaul
Init();

//Using end song
song.addEventListener("ended", handleEndSong);

//Using Button
playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",function(){
    changeSong(1);
});
prevbtn.addEventListener("click",function(){
    changeSong(0);
});
infiBtn.addEventListener("click", function(){
    if(infinite){
        infinite = false;
        infiBtn.removeAttribute("style");
    }
    else{
        infinite = true;
        repeat = false;
        infiBtn.style.color = "#ffb86c";
        repeatBtn.removeAttribute("style");
    }

});
repeatBtn.addEventListener("click",function(){
    if(repeat){
        repeat = false;
        repeatBtn.removeAttribute("style");
    }
    else{
        repeat = true;
        infinite = false;
        repeatBtn.style.color = "#ffb86c";
        infiBtn.removeAttribute("style");
    }
 
});

//Using rangeBar input
rangeBar.addEventListener("change",handleChangeBar);


function Init(){
    song.setAttribute("src",`./assets/music/${musics[0]}`);
    displayTimer();
    infiBtn.style.color = "#ffb86c";
}

function playPause(){

    if(isPlaying){
        song.play();
        isPlaying = false;
        musicThumb.classList.add("is--play");
        iconplay.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
        //Recursive
        timer = setInterval(() => {
            displayTimer();
        }, 1000);
        
    }
    else{
        song.pause();
        isPlaying = true;
        musicThumb.classList.remove("is--play");
        iconplay.innerHTML = `<ion-icon name="play"></ion-icon>`;
        clearInterval(timer);
    }
}

function changeSong(dir){
    if(dir == 1){
        indexSong++;
        if(indexSong >= musics.length){
            indexSong = 0;
        }   
    }
    else{
       indexSong--;
       if(indexSong < 0){
           indexSong = musics.length - 1;
       }
    }
    song.setAttribute("src",`./assets/music/${musics[indexSong]}`);
    isPlaying = true;
    playPause();
}

function displayTimer(){
    const {duration, currentTime} = song;
    remainingTime.textContent = formatTimer(currentTime);
    if(!duration){
        durationTime.textContent = "00:00";
    }
    else{
        durationTime.textContent = formatTimer(duration - currentTime);
    }

    rangeBar.max = duration;
    rangeBar.value = song.currentTime;

    if(currentTime >= duration){
        iconplay.innerHTML = `<ion-icon name="play"></ion-icon>`;
        musicThumb.classList.remove("is--play");
        isPlaying = true;
    }
}

function formatTimer(number){
    let minutes = Math.floor(number/60);
    let second = Math.floor(number%60);
    return `${minutes < 10 ? '0'+minutes : minutes}:${second < 10 ? '0'+second : second}`;
}

function handleChangeBar(){
    song.currentTime = rangeBar.value;
}

function handleEndSong(){
    if(infinite ){
        changeSong(1);
    }
    else if(repeat){
        isPlaying = true;
        playPause();
    }
   
}