document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audio-player");
    const playButton = document.getElementById("play");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const playlistItems = document.querySelectorAll(".playlist li");
    const currentSong = document.getElementById("current-song");

    let currentIndex = 0;
    let songs = [...playlistItems].map(item => item.dataset.src);

    function playSong() {
        audioPlayer.play();
        playButton.innerHTML = "⏸";
    }

    function pauseSong() {
        audioPlayer.pause();
        playButton.innerHTML = "▶️";
    }

    function togglePlay() {
        if (audioPlayer.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }

    function changeSong(index) {
        if (index < 0) index = songs.length - 1;
        if (index >= songs.length) index = 0;
        currentIndex = index;
        audioPlayer.src = songs[currentIndex];
        currentSong.textContent = `Now Playing: ${playlistItems[currentIndex].textContent}`;
        playSong();
    }

    playButton.addEventListener("click", togglePlay);
    prevButton.addEventListener("click", () => changeSong(currentIndex - 1));
    nextButton.addEventListener("click", () => changeSong(currentIndex + 1));

    playlistItems.forEach((item, index) => {
        item.addEventListener("click", () => changeSong(index));
    });

    audioPlayer.addEventListener("ended", () => changeSong(currentIndex + 1));
});
