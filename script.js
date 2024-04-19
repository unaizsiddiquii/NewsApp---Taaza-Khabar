const API_KEY = "d146bed1feec47b68d840a66ba480a74";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
  fetchNews("india");
});
function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
  console.log(data);
}

function bindData(articles) {
  const cardContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-cards");

  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsTitle = cardClone.getElementById("news-title");
  const newsImg = cardClone.getElementById("news-img");
  const newsSource = cardClone.getElementById("news-source");
  const newsDesc = cardClone.getElementById("news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-Us", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} . ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");

const searchText = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
