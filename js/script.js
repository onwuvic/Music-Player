/*
** This JavaScript was originally written in ES6 Version then compile to ES5
** Using Babel.io .
*/

"use strict";

/*
** This is an Array of the songs in the music folder
** It was written exactly the way it was in the music folder,
** This help to link it with music in the music folder.
*/

var songs = [
		"Adele - Hello.mp3", 
		"Alessia Cara - I\'m Yours.mp3", 
		"Alessia Cara - Scars To Your Beautiful.mp3", 
		"Ed Sheeran - All Of The Stars.mp3", 
		"James Arthur - Say You Won\'t Let Go.mp3", 
		"John Legend - Love Me Now.mp3", 
		"The Veronicas - In My Blood.mp3"
		];

/*
** This is an Array of each songs Album title.
*/

var albums = [
		"25", 
		"Know It All", 
		"Know It All", 
		"The Fault in Our Stars", 
		"Back from the Edge", 
		"Darkness and Light", 
		"My Blood"
		];

/*
** This is an Array of each songs cover image album
** It was written exactly the way it was in the img folder,
** This help to link it with images in the img folder.
*/

var cover = [
		"25.jpg", 
		"knowitall.jpg", 
		"knowitall.png", 
		"thefaultinourstars.jpg", 
		"backfromtheedge.jpg", 
		"darknesslight.jpg", 
		"theveronicas.jpg"
		];

/*
** This is the variables for each targeted DOM.
*/

var songTitle = document.querySelector('.song-title');
var albumTitle = document.querySelector('.album-title');
var prev = document.querySelector('.fa-backward');
var before = document.querySelector('.before');
var songCoverTop = document.querySelector('.player-head');
var songCoverBottom = document.querySelector('.bottom-image');
var skipButtons = document.querySelectorAll('.skipButton');
var next = document.querySelector('.fa-forward');
var toggle = document.querySelector('.toggle');
var playOrPause = document.querySelector('.play');
var volumeSlide = document.querySelector('.volume-run-track');
var playRate = document.querySelector('.playRate');
var currentTime = document.querySelector('.current-duration');
var totalDuration = document.querySelector('.total-duration');
var slider = document.querySelector('.player-knot');
var playerSeekbar = document.querySelector('.player-seekbar');
var nextsongTitle = document.querySelector('.next-song');

/*
** This is the song Object.
*/
var song = new Audio();

var currentSong = 0;

window.onload = loadSong;

function loadSong() {
	song.src = "music/" + songs[currentSong];
	songTitle.textContent = currentSong + 1 + '. ' + songs[currentSong];
	albumTitle.textContent = "Album: " + albums[currentSong];
	songCoverTop.innerHTML = "<img src=img/" + cover[currentSong] + " alt='cover' class='song-cover'>";
	songCoverBottom.innerHTML = "<img src=img/" + cover[currentSong] + " alt='cover' class='song-cover'>";
	nextsongTitle.innerHTML = currentSong == songs.length - 1 ? "Playlist Has Ended" : "<b>Next Song:</b> " + songs[currentSong + 1 % songs.length];
	song.volume = volumeSlide.value;
	song.play();
	setTimeout(showDuration, 1000);
}

setInterval(updateSlider, 1000);

function updateSlider() {
	var c = Math.round(song.currentTime);
	slider.value = c;
	currentTime.textContent = convertTime(c);
	if (song.ended) {
		nextSong();
	}
}

function convertTime(secs) {
	var min = Math.floor(secs / 60);
	var sec = secs % 60;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;
	return min + ":" + sec;
}

function showDuration() {
	var d = Math.floor(song.duration);
	totalDuration.textContent = convertTime(d);
}

function togglePlay() {
	var method = song.paused ? 'play' : 'pause';
	song[method]();
}

function updateButton() {
	var icon = this.paused ? "<i class='fa fa-play'></i>" : "<i class='fa fa-pause'></i>";
	playOrPause.innerHTML = icon;
}

function nextSong() {
	currentSong = currentSong == songs.length - 1 ? 0 : currentSong + 1;
	loadSong();
}

function previous() {
	currentSong = currentSong <= 0 ? 0 : currentSong - 1;
	loadSong();
}

function adjustVolume() {
	song[this.name] = this.value;
}

function handleProgress() {
	var percent = song.currentTime / song.duration * 100;
	var percentHigh = percent * 2;
	slider.style.marginLeft = percent + "%";
	before.style.width = percentHigh + "%";
}

function scrub(e) {
	var scrubTime = e.offsetX / playerSeekbar.offsetWidth * song.duration;
	song.currentTime = scrubTime;
}

function skip() {
	song.currentTime += parseFloat(this.dataset.skip);
}

//event listener
song.addEventListener('play', updateButton);
song.addEventListener('pause', updateButton);
song.addEventListener('timeupdate', handleProgress);

playOrPause.addEventListener('click', togglePlay);
next.addEventListener('click', nextSong);
prev.addEventListener('click', previous);
volumeSlide.addEventListener('change', adjustVolume);
playRate.addEventListener('change', adjustVolume);
skipButtons.forEach(function (button) {
	return button.addEventListener('click', skip);
});

var mousedown = false;
playerSeekbar.addEventListener('click', scrub);
slider.addEventListener('change', scrub);
slider.addEventListener('mousedown', function () {
	return mousedown = true;
});
slider.addEventListener('mouseup', function () {
	return mousedown = false;
});