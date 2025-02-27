const music = document.getElementById("wedding-music");
const musicIcon = document.getElementById("music-icon");

setTimeout(() => {
    music
        .play()
        .catch((error) => console.log("Tự động phát nhạc bị chặn:", error));
    musicIcon.className = "fa-solid fa-pause";
}, 5000); // Tự động phát nhạc sau 5 giây

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicIcon.className = "fa-solid fa-pause";
    } else {
        music.pause();
        musicIcon.className = "fa-solid fa-play";
    }
}
