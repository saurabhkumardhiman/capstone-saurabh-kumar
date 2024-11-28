import { createOptimizedPicture } from "../../scripts/aem.js";

async function fetchListData(jsonURL) {
  const response = await fetch(jsonURL);
  const data = await response.json();
  const articleListValue = data;
  console.log(articleListValue);
  const listOfArticles = articleListValue.data;
 
  const articles = document.createElement("ul");
  articles.classList.add("articles-list");
 
  listOfArticles.forEach((item) => {
    const listElem = document.createElement("li");
    listElem.classList.add('list');
 
    const image = document.createElement("img");
    image.src = item.image;
    const pictureElement = createOptimizedPicture(item.image);
    pictureElement.classList.add("articles-list-img");
    articles.appendChild(pictureElement);
 
    const isTitle = document.createElement("p");
    isTitle.classList.add("articles-list-title");
    isTitle.innerHTML = item.title;
    articles.appendChild(isTitle);
 
    const isDescription = document.createElement("p");
    isDescription.classList.add("articles-list-description");
    isDescription.innerHTML = item.description;
    articles.appendChild(isDescription);
 
    listElem.append(pictureElement);
    listElem.append(isTitle);
    listElem.append(isDescription);
    articles.append(listElem);

  });
 
  return articles;
}
 
export default async function decorate(block) {
  const articlesListJson = block.querySelector('a[href$=".json"]');
  const articlesListDiv = document.createElement("div");
  articlesListDiv.classList.add("all-articles");
 
  const allUrlLinks = articlesListJson.href;
 
  if (articlesListJson) {
    const articleDetails = await fetchListData(allUrlLinks);
    articlesListDiv.append(articleDetails);
    articlesListJson.replaceWith(articlesListDiv);
  }
}
 