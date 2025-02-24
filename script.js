const searchBar = document.getElementById("searchBar");
const resultsList = document.getElementById("resultsList");
const searchResults = document.getElementById("searchResults");
const playerSection = document.getElementById("player");
const songTitle = document.getElementById("songTitle");
const audioPlayer = document.getElementById("audioPlayer");

// Sample song database
const songs = [
    { title: "Shape of You", src: "songs/shape_of_you.mp3" },
    { title: "Blinding Lights", src: "songs/blinding_lights.mp3" },
    { title: "Uptown Funk", src: "songs/uptown_funk.mp3" }
];

// Handle search
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    resultsList.innerHTML = "";

    if (query === "") {
        searchResults.classList.add("hidden");
        return;
    }

    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query));

    if (filteredSongs.length === 0) {
        resultsList.innerHTML = "<p>No songs found</p>";
    } else {
        filteredSongs.forEach(song => {
            const li = document.createElement("li");
            li.textContent = song.title;
            li.addEventListener("click", () => playSong(song));
            resultsList.appendChild(li);
        });
    }

    searchResults.classList.remove("hidden");
});

// Play song function
function playSong(song) {
    songTitle.textContent = `Playing: ${song.title}`;
    audioPlayer.src = song.src;
    playerSection.classList.remove("hidden");
    audioPlayer.play();
}
