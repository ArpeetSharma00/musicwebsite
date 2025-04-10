// Sample data
const trendingSongs = [
  { title: "Skyline Drive", artist: "Aurora", img: "https://via.placeholder.com/180" },
  { title: "Golden Hour", artist: "JVKE", img: "https://via.placeholder.com/180" },
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
