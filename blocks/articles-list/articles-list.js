import { createOptimizedPicture } from "../../scripts/aem.js";

async function fetchArticlesData(jsonURL) {
  const response = await fetch(jsonURL);
  const data = await response.json();
  return data.data;
}

function createArticleList(articles) {

  const articleList = document.createElement("ul");
  articleList.classList.add("articles-list");

  articles.forEach((article) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list");

    const pictureElement = createOptimizedPicture(article.image);
    pictureElement.classList.add("articles-list-img");

    const titleElement = document.createElement("p");
    titleElement.classList.add("articles-list-title");
    titleElement.innerHTML = article.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("articles-list-description");
    descriptionElement.innerHTML = article.description;

    listItem.append(pictureElement, titleElement, descriptionElement);

    articleList.appendChild(listItem);
    
  });

  return articleList;
}

export default async function decorate(block) {
  const jsonLink = block.querySelector('a[href$=".json"]');

  if (jsonLink) {
    const articlesData = await fetchArticlesData(jsonLink.href);
    const articleList = createArticleList(articlesData);

    const articlesContainer = document.createElement("div");
    articlesContainer.classList.add("all-articles");

    articlesContainer.appendChild(articleList);
    jsonLink.replaceWith(articlesContainer);
  }
}