async function fetchData(jsonURL) {
  const response = await fetch(jsonURL);
  const data = await response.json();
  return data.data;
}

function createListItem(listOfItems) {
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('dynamic-list-details');

  listOfItems.forEach((item) => {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('wrapper-div');

    const isTitle = document.createElement('div');
    isTitle.classList.add('title');
    isTitle.innerHTML = item.title;

    const isDescription = document.createElement('div');
    isDescription.classList.add('description');
    isDescription.innerHTML = item.description;

    wrapperDiv.append(isTitle);
    wrapperDiv.append(isDescription);

    parentDiv.appendChild(wrapperDiv);
  });

  return parentDiv;
}

export default async function decorate(block) {
  const jsonList = block.querySelector('a[href$=".json"]');
  const mainList = document.createElement('div');
  mainList.classList.add('dynamic-list');

  if (jsonList) {
    const listOfItems = await fetchData(jsonList.href);
    const list = createListItem(listOfItems);

    mainList.appendChild(list);
    jsonList.replaceWith(mainList);
  }
}
