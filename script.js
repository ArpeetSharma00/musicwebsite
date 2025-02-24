// Handle login
function login() {
    document.getElementById("auth-container").classList.add("hidden");
    document.getElementById("main-container").classList.remove("hidden");
}

// Toggle dropdown menu
function toggleDropdown() {
    let dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("hidden");
}

// Sample song data
const songs = [
    { title: "Song 1", explicit: false },
    { title: "Song 2", explicit: true },
    { title: "Song 3", explicit: false },
    { title: "Song 4", explicit: true }
];

// Search songs
function searchSongs() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    let filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query));

    filteredSongs.forEach(song => {
        let songElement = document.createElement("div");
        songElement.classList.add("song");
        songElement.innerHTML = song.title + (song.explicit ? ' <span class="explicit">E</span>' : '');
        songElement.onclick = () => playSong(song.title);
        resultsContainer.appendChild(songElement);
    });
}

// Play song
function playSong(title) {
    document.getElementById("player").classList.remove("hidden");
    document.getElementById("songTitle").innerText = title;
}

// Like song
function likeSong() {
    alert("Song liked!");
}

// Add to playlist
function addToPlaylist() {
    alert("Added to playlist!");
}
