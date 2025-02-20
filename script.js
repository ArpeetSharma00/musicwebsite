document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audio-player");
    const playButton = document.getElementById("play");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const searchBar = document.getElementById("search-bar");
    const suggestionsList = document.getElementById("suggestions");
    const searchResultsList = document.getElementById("search-results");
    const songUpload = document.getElementById("song-upload");
    const currentSong = document.getElementById("current-song");

    

    // 🎵 Song List
    const songs = [
        { title: "Song 1", src: "assets/song1.mp3" },
        { title: "Song 2", src: "assets/song2.mp3" },
        { title: "Song 3", src: "assets/song3.mp3" },
        { title: "Song 4", src: "assets/song4.mp3" }
    ];

    let currentIndex = 0;
    let isPlaying = false;

    // 🎶 Load Suggestions
    function loadSuggestions() {
        suggestionsList.innerHTML = "";
        songs.forEach((song, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = song.title;
            listItem.dataset.index = index;
            listItem.addEventListener("click", () => searchSong(song.title));
            suggestionsList.appendChild(listItem);
        });
    }

    // 🔍 Search for Songs
    function searchSong(query) {
        searchResultsList.innerHTML = "";
        const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query.toLowerCase()));
        filteredSongs.forEach((song, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = song.title;
            listItem.dataset.index = index;
            listItem.addEventListener("click", () => changeSong(index));
            searchResultsList.appendChild(listItem);
        });
    }

    

    // 🎵 Play Song
    function playSong() {
        audioPlayer.play();
        playButton.innerHTML = "⏸";
        isPlaying = true;
    }

    // ⏸ Pause Song
    function pauseSong() {
        audioPlayer.pause();
        playButton.innerHTML = "▶️";
        isPlaying = false;
    }

    // ▶️ Toggle Play/Pause
    function togglePlay() {
        isPlaying ? pauseSong() : playSong();
    }

    // 🔄 Change Song
    function changeSong(index) {
        currentIndex = index;
        audioPlayer.src = songs[currentIndex].src;
        currentSong.textContent = `Now Playing: ${songs[currentIndex].title}`;
        playSong();
    }

    uploadBtn.addEventListener("click", () => songUpload.click()); // Open file picker when button is clicked

songUpload.addEventListener("change", () => {
    const file = songUpload.files[0];
    if (file) {
        const songURL = URL.createObjectURL(file);
        const songTitle = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension

        // Add to song list
        songs.push({ title: songTitle, src: songURL });

        // Update playlist & play the uploaded song
        updatePlaylist();
        changeSong(songs.length - 1); // Play the latest uploaded song
    }
});

// Function to update playlist UI
function updatePlaylist() {
    searchResultsList.innerHTML = "";
    songs.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = song.title;
        listItem.dataset.index = index;
        listItem.addEventListener("click", () => changeSong(index));
        searchResultsList.appendChild(listItem);
    });
}

// Function to play the selected song
function changeSong(index) {
    audioPlayer.src = songs[index].src;
    audioPlayer.play();
}

// Load the initial playlist
updatePlaylist();

    // 🔄 Initialize
    searchBar.addEventListener("input", () => searchSong(searchBar.value));
    playButton.addEventListener("click", togglePlay);
    prevButton.addEventListener("click", () => changeSong(currentIndex - 1));
    nextButton.addEventListener("click", () => changeSong(currentIndex + 1));
    loadSuggestions();
});
