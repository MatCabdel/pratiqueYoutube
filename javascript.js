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

 async function createRender(div, method, elements) {
  div.innerHTML = "";
  elements.forEach((el) => {
    method(el);
  })
}

async function renderVideos(videos) { await createRender(cards, createVideo, videos)}
async function renderCategories(categories) { await createRender(categoriesContainer, createCategory, categories)}

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

function createHTMLElement(node, className, parent) {
  const element = document.createElement(node);
  element.classList.add(className);
  parent.appendChild(element);
  return element;
}

function createVideo(video) {

  const divCard = createHTMLElement("div", "card-container", cards)
  const cardImg = createHTMLElement("img", "img-container", divCard )
  cardImg.src = video.img;
  const divTitle = createHTMLElement("div", "title-container", divCard )
  const divIcon = createHTMLElement("div", "icon-container", divTitle )
  const cardIcon = createHTMLElement("img", "card-icon-container", divIcon )
  cardIcon.src = video.iconUser;
  const titles = createHTMLElement("div", "titles", divTitle )
  const mainTitle = createHTMLElement("div", "mainTitles", titles);
  createHTMLElement("h3", "title-video", mainTitle, video.name);
  const subtitles = createHTMLElement("div", "subtitles", titles);
  const cardChannel = createHTMLElement("h4", "channel-container", subtitles);
  cardChannel.innerHTML = video.channelUserName;
  const viewTitle = createHTMLElement("h4", "view-container", subtitles);
  viewTitle.innerHTML = `${video.viewByVideo} vues - il y a ${video.parutionDate}`
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
