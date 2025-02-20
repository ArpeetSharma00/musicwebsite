document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audio-player");
    const playButton = document.getElementById("play");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const playlistItems = document.querySelectorAll(".playlist li");
    const currentSong = document.getElementById("current-song");

    let currentIndex = 0;
    let isPlaying = false; // Track play state
    let songs = [...playlistItems].map(item => item.dataset.src);

    function playSong() {
        audioPlayer.play();
        playButton.innerHTML = "⏸";
        playButton.style.background = "#00ff00";
        playButton.style.boxShadow = "0 0 10px #00ff00";
        isPlaying = true;
    }

    function pauseSong() {
        audioPlayer.pause();
        playButton.innerHTML = "▶️";
        playButton.style.background = "rgba(255, 255, 255, 0.2)";
        playButton.style.boxShadow = "none";
        isPlaying = false;
    }

    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    function changeSong(index) {
        if (index < 0) index = songs.length - 1;
        if (index >= songs.length) index = 0;
        currentIndex = index;
        audioPlayer.src = songs[currentIndex];
        currentSong.textContent = `Now Playing: ${playlistItems[currentIndex].textContent}`;
        playSong(); // Automatically play new song
    }

    playButton.addEventListener("click", togglePlay);
    prevButton.addEventListener("click", () => changeSong(currentIndex - 1));
    nextButton.addEventListener("click", () => changeSong(currentIndex + 1));

    playlistItems.forEach((item, index) => {
        item.addEventListener("click", () => changeSong(index));
    });

    audioPlayer.addEventListener("ended", () => changeSong(currentIndex + 1));
});

