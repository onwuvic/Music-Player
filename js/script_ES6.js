	let songs = [
		"Adele - Hello.mp3", 
		"Alessia Cara - Im Yours.mp3", 
		"Alessia Cara - Scars To Your Beautiful.mp3", 
		"Ed Sheeran - All Of The Stars.mp3", 
		"James Arthur - Say You Wont Let Go.mp3", 
		"John Legend - Love Me Now.mp3", 
		"The Veronicas - In My Blood.mp3"
		];

	let albums = [
		"25",
		"Know It All",
		"Know It All",
		"The Fault in Our Stars", 
		"Back from the Edge", 
		"Darkness and Light",
		"My Blood" 
		];
			
	let cover = [
		"25.jpg",
		"knowitall.jpg",
		"knowitall.png",
		"thefaultinourstars.jpg",
		"backfromtheedge.jpg",
		"darknesslight.jpg",
		"theveronicas.jpg"
		];

	let songTitle = document.querySelector('.song-title');
	let albumTitle = document.querySelector('.album-title');
	let prev = document.querySelector('.fa-backward');
	let before = document.querySelector('.before');
	let songCoverTop = document.querySelector('.player-head');
	let songCoverBottom = document.querySelector('.bottom-image');
	let skipButtons = document.querySelectorAll('.skipButton');
	let next = document.querySelector('.fa-forward');
	let toggle = document.querySelector('.toggle');
	let playOrPause = document.querySelector('.play');
	let volumeSlide = document.querySelector('.volume-run-track');
	let playRate = document.querySelector('.playRate');
	let currentTime = document.querySelector('.current-duration');
	let totalDuration = document.querySelector('.total-duration');
	let slider = document.querySelector('.player-knot');
	let playerSeekbar = document.querySelector('.player-seekbar');
	let nextsongTitle = document.querySelector('.next-song');


	let song = new Audio();

	let currentSong = 0;

	window.onload = loadSong;

	function loadSong() {
		song.src = "music/" + songs[currentSong];
		songTitle.textContent = (currentSong + 1) + '. ' + songs[currentSong];
		albumTitle.textContent = "Album: " + albums[currentSong];
		songCoverTop.innerHTML = "<img src=img/" + cover[currentSong] + " alt='cover' class='song-cover'>";
		songCoverBottom.innerHTML = "<img src=img/" + cover[currentSong] + " alt='cover' class='song-cover'>";

		nextsongTitle.innerHTML = (currentSong == (songs.length - 1)) ? "Playlist Has Ended" : "<b>Next Song:</b> " + songs[currentSong + 1 % songs.length];
				
		song.volume = volumeSlide.value;
		song.play();
		setTimeout(showDuration, 1000);
	}

	setInterval(updateSlider, 1000);

	function updateSlider() {
		let c = Math.round(song.currentTime);
		slider.value = c;
		currentTime.textContent = convertTime(c);
		if (song.ended) { nextSong(); }
	}

	function convertTime(secs) {
		let min = Math.floor(secs/60);
		let sec = secs % 60;
		min = (min < 10) ? "0" + min : min;
		sec = (sec < 10) ? "0" + sec : sec;
		return (min + ":" + sec);
	}

	function showDuration(){
		let d = Math.floor(song.duration);
		totalDuration.textContent = convertTime(d);
	}

	function togglePlay() {
		const method = song.paused ? 'play' : 'pause';
		song[method]();
	}

	function updateButton() {
		const icon = this.paused ? "<i class='fa fa-play'></i>" : "<i class='fa fa-pause'></i>";
		playOrPause.innerHTML = icon;
	}

	function nextSong() {
		currentSong = (currentSong == (songs.length - 1)) ? 0 : (currentSong + 1);
		loadSong();
	}

	function previous() {
		currentSong = (currentSong <= 0) ? 0 : (currentSong - 1);
		loadSong();
	}

	function adjustVolume() {
		song[this.name] = this.value
	}

	function handleProgress() {
		const percent = (song.currentTime / song.duration) * 100;
		const percentHigh = percent * 2;
		slider.style.marginLeft = `${percent}%`;
		before.style.width = `${percentHigh}%`;
	}

	function scrub(e) {
		const scrubTime = (e.offsetX / playerSeekbar.offsetWidth) * song.duration;
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
	skipButtons.forEach(button => button.addEventListener('click', skip));

	let mousedown = false;
	playerSeekbar.addEventListener('click', scrub);
	slider.addEventListener('change', scrub);
	slider.addEventListener('mousedown', () => mousedown = true);
	slider.addEventListener('mouseup', () => mousedown = false);
