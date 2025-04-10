// Sample data
const trendingSongs = [
  { title: "Skyline Drive", artist: "Aurora", img: "" },
  { title: "Golden Hour", artist: "JVKE", img: "https://i.postimg.cc/B6RPF3wr/artworks-Xbx-ZOWT3w-Dfia4-Z5-5fiy-BQ-t1080x1080.jpg" },
  { title: "Drift Away", artist: "Nina", img: "https://via.placeholder.com/180" },
];

const topPlaylists = [
  { title: "Lo-fi Chill", img: "https://via.placeholder.com/180" },
  { title: "Workout Beats", img: "https://via.placeholder.com/180" },
  { title: "Sunday Vibes", img: "https://via.placeholder.com/180" },
];

function createCard({ title, artist = "", img }) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${img}" alt="${title}" />
    <h4>${title}</h4>
    ${artist ? `<p>${artist}</p>` : ""}
  `;
  return card;
}

window.onload = () => {
  const trendingContainer = document.getElementById("trending-songs");
  trendingSongs.forEach(song => trendingContainer.appendChild(createCard(song)));

  const playlistsContainer = document.getElementById("top-playlists");
  topPlaylists.forEach(pl => playlistsContainer.appendChild(createCard(pl)));
};

const player = {
  audio: new Audio(),
  repeat: false,
  playing: false,
};

const playBtn = document.getElementById('play-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progress = document.getElementById('progress');
const art = document.getElementById('player-art');
const title = document.getElementById('player-title');
const artist = document.getElementById('player-artist');

// Example click trigger (modify to match your song card logic)
document.querySelectorAll('.card').forEach((card, index) => {
  card.addEventListener('click', () => {
    const song = {
      title: card.querySelector('h4').innerText,
      artist: card.querySelector('p')?.innerText || 'Unknown',
      img: card.querySelector('img').src,
      src: `assets/song${index + 1}.mp3` // Assume song1.mp3, song2.mp3...
    };
    loadSong(song);
  });
});

function loadSong(song) {
  art.src = song.img;
  title.textContent = song.title;
  artist.textContent = song.artist;
  player.audio.src = song.src;
  player.audio.play();
  player.playing = true;
  playBtn.textContent = '⏸️';
}

playBtn.addEventListener('click', () => {
  if (player.playing) {
    player.audio.pause();
    playBtn.textContent = '▶️';
  } else {
    player.audio.play();
    playBtn.textContent = '⏸️';
  }
  player.playing = !player.playing;
});

repeatBtn.addEventListener('click', () => {
  player.repeat = !player.repeat;
  player.audio.loop = player.repeat;
  repeatBtn.style.color = player.repeat ? 'lightgreen' : 'white';
});

player.audio.addEventListener('timeupdate', () => {
  progress.value = player.audio.currentTime;
  progress.max = player.audio.duration;
});

progress.addEventListener('input', () => {
  player.audio.currentTime = progress.value;
});

const musicPlayer = document.getElementById('music-player');
const toggleBtn = document.getElementById('toggle-player');

function expandPlayer() {
  musicPlayer.classList.add('fullscreen');
  toggleBtn.textContent = '🔽'; // show minimize icon
}

function minimizePlayer() {
  musicPlayer.classList.remove('fullscreen');
  toggleBtn.textContent = '🔼'; // show expand icon
}

toggleBtn.addEventListener('click', () => {
  if (musicPlayer.classList.contains('fullscreen')) {
    minimizePlayer();
  } else {
    expandPlayer();
  }
});

// Auto-expand when song is loaded
function loadSong(song) {
  art.src = song.img;
  title.textContent = song.title;
  artist.textContent = song.artist;
  player.audio.src = song.src;
  player.audio.play();
  player.playing = true;
  playBtn.textContent = '⏸️';
  expandPlayer();
}

const closeBtn = document.getElementById('close-player');

// Close the player completely
closeBtn.addEventListener('click', () => {
  player.audio.pause();
  musicPlayer.classList.add('hidden');
  player.playing = false;
  playBtn.textContent = '▶️';
});

// Show player again when a song is clicked
function loadSong(song) {
  art.src = song.img;
  title.textContent = song.title;
  artist.textContent = song.artist;
  player.audio.src = song.src;
  player.audio.play();
  player.playing = true;
  playBtn.textContent = '⏸️';
  musicPlayer.classList.remove('hidden');
  expandPlayer();
}
