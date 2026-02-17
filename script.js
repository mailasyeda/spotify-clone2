let play = document.getElementById("play");
let progressBar = document.getElementById("progressBar");
let audio = new Audio("Audio/1.mp3");

let currentSong = 1;

play.addEventListener("click", () => {
  if (audio.paused || audio.currentTime == 0) {
    audio.play();
    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");
  } else {
    audio.pause();
    play.classList.remove("fa-circle-pause");
    play.classList.add("fa-circle-play");
  }
});

audio.addEventListener("timeupdate", () => {
  let progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
});

progressBar.addEventListener("input", function () {
  let value = this.value;
  this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
  audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName("playMusic"));

makeAllPlay = () => {
  playMusic.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

playMusic.forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlay();
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");

    index = parseInt(e.target.id);
    currentSong = index;
    audio.src = `Audio/${index}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
  });
});

let allMusic = Array.from(document.getElementsByClassName("music-card"));

songs = [
  {
    songName: "No one Noticed",
    songDes: "Song by The Marias",
    songImage: "images/1.jpg",
    songPath: "Audio/1.mp3",
  },
  {
    songName: "The Night WE Met",
    songDes: "song by The Lord Huron ",
    songImage: "images/2.jpg",
    songPath: "Audio/2.mp3",
  },
  {
    songName: "Sailor",
    songDes: "Song by The Gigi Perez",
    songImage: "images/3.jpg",
    songPath: "Audio/3.mp3",
  },
  {
    songName: "Heat Waves",
    songDes: "Song by The Glass Animals",
    songImage: "images/4.jpg",
    songPath: "Audio/4.mp3",
  },
  {
    songName: "Dandelions",
    songDes: "song by The Ruth B",
    songImage: "images/5.jpg",
    songPath: "Audio/5.mp3",
  },
  {
    songName: "Lovely",
    songDes: "song  by The Billie Elliesh",
    songImage: "images/6.jpg",
    songPath: "Audio/6.mp3",
  },
  {
    songName: "Star Boy",
    songDes: "Song by the Weekend",
    songImage: "images/7.jpg",
    songPath: "Audio/7.mp3",
  },
  {
    songName: "Night Changes",
    songDes: "Song by The One Direction",
    songImage: "images/8.jpg",
    songPath: "Audio/8mp3",
  },
  {
    songName: "Another love",
    songDes: "Song by The Tom Odell",
    songImage: "images/9.jpg",
    songPath: "Audio/9.mp3",
  },
  {
    songName: "Open Arms",
    songDes: "Song by The SZA,Traviss Scout",
    songImage: "images/10.jpg",
    songPath: "Audio/10.mp3",
  },
  {
    songName: "Perfect",
    songDes: "Song by the Ed Sheeran",
    songImage: "images/11.jpg",
    songPath: "Audio/11.mp3",
  },
  {
    songName: "Shape of you",
    songDes: "Song by the Ed Sheeran ",
    songImage: "images/12.jpg",
    songPath: "Audio/12.mp3",
  },
  {
    songName: "aint like us",
    songDes: "Song by The Kendrick Lamar",
    songImage: "images/13.jpg",
    songPath: "Audio/13.mp3",
  },
  {
    songName: "Savage",
    songDes: "Song by The SABR",
    songImage: "images/14.jpg",
    songPath: "Audio/14.mp3",
  },
  {
    songName: "High on you",
    songDes: "Song by The Jind Universe",
    songImage: "images/15.jpg",
    songPath: "Audio/15.mp3",
  },
  {
    songName: "Birds of a Feather",
    songDes: "Song by The Billie Eilliesh",
    songImage: "images/16.jpg",
    songPath: "Audio/16.mp3",
  },
  {
    songName: "kk",
    songDes: "Song by The Pritam",
    songImage: "images/17.jpg",
    songPath: "Audio/17.mp3",
  },
];

order = [...songs];

allMusic.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].songImage;
  element.getElementsByClassName("img-title")[0].innerText = songs[i].songName;
  element.getElementsByClassName("img-description")[0].innerText =
    songs[i].songDes;
});

let shuffle = document.getElementById("shuffle");
let repeat = document.getElementById("repeat");
let nowBar = document.querySelector(".now-bar");

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs(originalOrder) {
  order = [...originalOrder];
  for (i = order.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

shuffle.addEventListener("click", () => {
  if (!songOnShuffle) {
    songOnShuffle = true;
    songOnRepeat = false;
    shuffle.classList.add("active");
    repeat.classList.remove("active");

    order = shuffleSongs(songs);
  } else {
    songOnShuffle = false;
    shuffle.classList.remove("active");

    order = songs;
  }
});

repeat.addEventListener("click", () => {
  if (!songOnRepeat) {
    songOnRepeat = true;
    songOnShuffle = false;
    repeat.classList.add("active");
    shuffle.classList.remove("active");
  } else {
    songOnRepeat = false;
    repeat.classList.remove("active");
  }
});

playNextSong = () => {
  if (!songOnRepeat) {
    let nextSong = (currentSong + 1) % playMusic.length;
    currentSong = nextSong == 0 ? 18 : nextSong;

    audio.src = order[currentSong - 1].songPath;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
  } else {
    audio.src = order[currentSong - 1].songPath;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
  }
};

playPrevSong = () => {
  let prevSong = currentSong - 1;
  currentSong = prevSong == 0 ? 18 : prevSong;
  audio.src = `Audio/${currentSong}.mp3`;
  audio.currentTime = 0;
  audio.play();
  updateNowBar();
};

function updateNowBar() {
  nowBar.getElementsByTagName("img")[0].src = order[currentSong - 1].songImage;
  nowBar.getElementsByClassName("img-title-info")[0].innerText =
    order[currentSong - 1].songName;
  nowBar.getElementsByClassName("img-des-info")[0].innerText =
    order[currentSong - 1].songDes;
}

forward = document.getElementById("forward");
backward = document.getElementById("backward");

forward.addEventListener("click", () => {
  playNextSong();
});

audio.addEventListener("ended", () => {
  playNextSong();
});

backward.addEventListener("click", () => {
  playPrevSong();
});
