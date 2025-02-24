const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const songTitle = document.getElementById("song-title");
const cover = document.getElementById("cover");
const playlist = document.getElementById("playlist");

const songs = [
    { title: "Song 1", src: "song1.mp3", cover: "cover1.jpg" },
    { title: "Song 2", src: "song2.mp3", cover: "cover2.jpg" },
    { title: "Song 3", src: "song3.mp3", cover: "cover3.jpg" }
];

let songIndex = 0;

function loadSong(song) {
    songTitle.textContent = song.title;
    audio.src = song.src;
    cover.src = song.cover;
}

function playSong() {
    audio.play();
    playBtn.textContent = "⏸️";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

playlist.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        const song = songs.find(s => s.src === e.target.getAttribute("data-src"));
        songIndex = songs.indexOf(song);
        loadSong(song);
        playSong();
    }
});

loadSong(songs[songIndex]);
