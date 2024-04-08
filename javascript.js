/********************* Fetch and Render ********************** */

async function fetchData(jsonFile) {
  try {
    const response = await fetch(jsonFile);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderVideos(videos) {
  cards.innerHTML = "";
  videos.forEach((video) => {
    createVideo(video);
  });
}

async function renderCategories(categories) {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    createCategory(category);
  });
}

async function renderChannel(jsonFile) {
  const response = await fetch(jsonFile);
  const videos = await response.json();
  const channelsData = videos.map((video) => ({
    channelUserName: video.channelUserName,
    iconUser: video.iconUser,
  }));

  channels.innerHTML = "";

  channelsData.forEach((channel) => {
    createChannel(channel);
  });
}
renderChannel("data.json");

async function fetchDataAndRender(jsonFile) {
  try {
    const response = await fetch(jsonFile);
    const videos = await response.json();
    renderVideos(videos);
    renderCategories(
      jsonFile.includes("dataX") ? categoriesHotData : categoriesData
    );
  } catch (error) {
    console.error("Error fetching and rendering data:", error);
  }
}

fetchDataAndRender("data.json");

/********************* Toggle ********************** */

function toggleImage() {
  const image = document.getElementById("imageToggle");
  const currentLogo = image.src;
  const newLogo = currentLogo.includes("logoYoutube.png")
    ? "assets/Pornhub-Logo-histoire.jpeg"
    : "assets/logoYoutube.png";
  image.src = newLogo;
  const newCategories = newLogo.includes("Pornhub")
    ? categoriesHotData
    : categoriesData;

  renderCategories(newCategories);

  const jsonDataFile = newLogo.includes("Pornhub") ? "dataX.json" : "data.json";
  fetchDataAndRender(jsonDataFile);
  renderChannel(jsonDataFile);
}

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

/********************* Category Button ********************** */

const categoriesData = [
  "Tous",
  "Musique",
  "Sports",
  "News",
  "Découvertes",
  "Entrepreneur",
  "Divertissement",
];
const categoriesHotData = [
  "Tous",
  "Milf",
  "Big tits",
  "Mature",
  "Amateur",
  "french videos",
  "public",
];

const categoriesContainer = document.querySelector(".filter-container");

function createCategory(category) {
  const divFilter = document.createElement("div");
  divFilter.classList.add("filters");
  const btnFilter = document.createElement("button");
  btnFilter.classList.add("btn-filters");
  btnFilter.textContent = category;
  btnFilter.addEventListener("click", () => filterVideos(category));
  divFilter.appendChild(btnFilter);
  categoriesContainer.appendChild(divFilter);
}
function filterVideos(category) {
  const currentLogo = document.getElementById("imageToggle").src;
  if (category === "Tous") {
    const jsonFile = currentLogo.includes("Pornhub")
      ? "dataX.json"
      : "data.json";
    fetchDataAndRender(jsonFile);
  } else {
    const jsonFile = currentLogo.includes("Pornhub")
      ? "dataX.json"
      : "data.json";
    fetchDataAndRender(jsonFile).then(() => {
      fetchData(jsonFile).then((data) => {
        const filteredVideos = data.filter(
          (video) => video.categorieVideo === category
        );
        renderVideos(filteredVideos);
      });
    });
  }
}

/********************* searchBar ********************** */

const searchInput = document.querySelector('.searchbar input[type="search"]');

searchInput.addEventListener("input", () => {
  filterVideosBySearchTerm(searchTerm);
});
const searchTerm = searchInput.value.trim().toLowerCase();

function filterVideosBySearchTerm(searchTerm) {
  const currentLogo = document.getElementById("imageToggle").src;
  const jsonFile = currentLogo.includes("Pornhub") ? "dataX.json" : "data.json";

  fetchData(jsonFile).then((data) => {
    const filteredVideos = data.filter((video) => {
      return (
        video.name.toLowerCase().includes(searchTerm) ||
        video.channelUserName.toLowerCase().includes(searchTerm)
      );
    });
    renderVideos(filteredVideos);
  });
}

function handleSearchChange() {
  const searchTerm = document
    .querySelector('.searchbar input[type="search"]')
    .value.trim()
    .toLowerCase();
  filterVideosBySearchTerm(searchTerm);
}

/********************* Affichages des chaines ********************** */

const channels = document.querySelector(".channel-nav");

function createChannel(video) {
  const listChannel = document.createElement("div");
  listChannel.classList.add("list-channel");
  channels.appendChild(listChannel);

  const ul = document.createElement("ul");
  ul.classList.add("channel-list");
  listChannel.appendChild(ul);

  const li = document.createElement("li");
  ul.appendChild(li);

  const channelImg = document.createElement("img");
  channelImg.src = video.iconUser;
  channelImg.classList.add("img-channel");
  li.appendChild(channelImg);

  const channelName = document.createElement("button");
  channelName.innerHTML = video.channelUserName;
  channelName.classList.add("name-channel");
  li.appendChild(channelName);
}
