fetch("./data.json")
  .then((response) => response.json())
  .then((videos) => {
    videos.forEach((video) => {
      createVideo(video);
    });
  }); 
  
 /*********************Toggle Logo********************** */

 function toggleImage() {
  const image = document.getElementById('imageToggle');
  const newLogo = image.src.match("assets/logoYoutube.png") ? "assets/Pornhub-Logo-histoire.jpeg" : "assets/logoYoutube.png";
  image.src = newLogo;
  clearCategories();
  renderCategories(newLogo === "assets/Pornhub-Logo-histoire.jpeg" ? categoriesHotData : categoriesData);
}

function clearCategories() {
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = "";
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



/*********************Category Button********************** */

const categoriesData = ["Tous", "Musique", "Sports", "News", "Découvertes", "Entrepreneur", "Divertissement"];
const categoriesHotData = ["Tous", "Milf", "Big tits", "Mature", "Amateur", "french videos", "public"];

const categories = document.querySelector(".filter-container");

const categoriesContainer = document.querySelector(".filter-container");

function renderCategories(categories) {
  categoriesContainer.innerHTML = "";
  categories.forEach(category => {
    createCategory(category);
  });
}

async function fetchDataAndRender() {
  try {
    const response = await fetch('data.json');
    const videos = await response.json();
    renderVideos(videos);
    renderCategories(categoriesData);
  } catch (error) {
    console.error('Error fetching and rendering data:', error);
  }
}

function renderVideos(videos) {
  cards.innerHTML = "";
  videos.forEach(video => {
    createVideo(video);
  });
}

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
  if (category === "Tous") {
    fetchDataAndRender();
  } else {
    fetchData().then(data => {
      const filteredVideos = data.filter(video => video.categorieVideo === category);
      renderVideos(filteredVideos);
    });
  }
}

async function fetchData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchDataAndRender();