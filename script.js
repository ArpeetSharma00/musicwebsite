const searchBar = document.getElementById("searchBar");
const resultsList = document.getElementById("resultsList");
const searchResults = document.getElementById("searchResults");
const playerSection = document.getElementById("player");
const songTitle = document.getElementById("songTitle");
const audioPlayer = document.getElementById("audioPlayer");
const albumArt = document.getElementById("albumArt");
const progressBar = document.getElementById("progressBar");
const timeDisplay = document.getElementById("timeDisplay");
const lyrics = document.getElementById("lyrics");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");

// Sample songs
const songs = [
    { title: "Shape of You", src: "songs/shape_of_you.mp3", art: "images/shape_of_you.jpg", lyrics: "Lyrics for Shape of You..." },
    { title: "Blinding Lights", src: "songs/blinding_lights.mp3", art: "images/blinding_lights.jpg", lyrics: "Lyrics for Blinding Lights..." },
    { title: "Uptown Funk", src: "songs/uptown_funk.mp3", art: "images/uptown_funk.jpg", lyrics: "Lyrics for Uptown Funk..." }
];

let currentSongIndex = 0;

// Search function
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    resultsList.innerHTML = "";
    searchResults.classList.remove("hidden");

    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query));

    filteredSongs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = song.title;
        li.addEventListener("click", () => playSong(index));
        resultsList.appendChild(li);
    });
});

// Play song
function playSong(index) {
    const song = songs[index];
    songTitle.textContent = `Playing: ${song.title}`;
    audioPlayer.src = song.src;
    albumArt.src = song.art;
    lyrics.textContent = song.lyrics;
    currentSongIndex = index;
    playerSection.classList.remove("hidden");
    audioPlayer.play();
}

// Playback controls
document.getElementById("prevBtn").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

// Progress bar
audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
    timeDisplay.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
});

progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

// Theme toggle
toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});
