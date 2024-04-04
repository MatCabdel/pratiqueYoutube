fetch("./data.json")
  .then((response) => response.json())
  .then((videos) => {
    videos.forEach((video) => {
      createVideo(video);
    });
  });

  /*********************Affichages des vidéos********************** */

const cards = document.querySelector(".video-cards");

function createVideo(video) {
  const divCard = document.createElement("div");
  divCard.classList.add("card-container");
  cards.appendChild(divCard);

  const cardImg = document.createElement("img");
  cardImg.src = video.img;
  divCard.classList.add("img-container");
  divCard.appendChild(cardImg);

  const divTitle = document.createElement("div");
  divTitle.classList.add("title-container");
  divCard.appendChild(divTitle);

  const divIcon = document.createElement("div");
  divIcon.classList.add("icon-container");
  divTitle.appendChild(divIcon);

  const cardIcon = document.createElement("img");
  cardIcon.src = video.iconUser;
  divIcon.appendChild(cardIcon);

  const titles = document.createElement("div");
  titles.classList.add("titles");
  divTitle.appendChild(titles);

  const mainTitle = document.createElement("div");
  mainTitle.classList.add("mainTitles");
  titles.appendChild(mainTitle);

  const cardTitle = document.createElement("h3");
  cardTitle.innerHTML = video.name;
  divCard.classList.add("title-video");
  titles.appendChild(cardTitle);

  const subtitles = document.createElement("div");
  subtitles.classList.add("subtitles");
  titles.appendChild(subtitles);

  const cardChannel = document.createElement("h4");
  cardChannel.innerHTML = video.channelUserName;
  divCard.classList.add("channel-container");
  subtitles.appendChild(cardChannel);

  const viewTitle = document.createElement("h4");
  viewTitle.innerHTML = `${video.viewByVideo} vues - il y a ${video.parutionDate}`;
  divCard.classList.add("view-container");
  subtitles.appendChild(viewTitle);
}

/*********************Category Button********************** */

const categories = document.querySelector(".filter-container");

function createCategory(video) {
  const divFilter = document.createElement("div");
  divFilter.innerHTML = `<div>
  <ul>
  <li>Tous</li>
  <li>Musique</li>
  <li>milf</li>
  <li>Entrepreneur/li>
  <li>Big Boobs</li>
  <li>Divertissement</li>
  <li>Découverte</li>
  <li>Jeux vidéo</li>
  <li>Actualités</li>
  <li>Podcast</li>
</ul></div>`;
  divCard.classList.add("filters");
  categories.appendChild(divFilter);

}