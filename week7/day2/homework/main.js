let API = "https://rickandmortyapi.com/api/character";

fetch(API)
  .then((res) => res.json())
  .then((response) => renderList(response));

function renderList(response) {
  let charList = response.results;
  //postToJsonServer(response.results);
  for (let i = 0; i < charList.length; i++) {
    $(".listlist").append(
      `<li class="listItem${i}"><h2>${charList[i].name}</h2></li>`
    );
    getCharInfo(charList[i].url, `listItem${i}`);
  }
}

function getCharInfo(api, listItem) {
  fetch(api)
    .then((res) => res.json())
    .then(
      (response) =>
        $("." + listItem).append(
          `<img class="charImg" src="${response.image}"/><ul class="moreInfo"><li>Species: ${response.species}</li><li>Status: ${response.status}</li><li>Location: ${response.location.name}</li><li>Origin: ${response.origin.name}</li><li>Gender: ${response.gender}</li></ul>`
        )
      //console.log(response)
    );
}

function postToJsonServer(items) {
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    fetch("http://localhost:3000/characters", {
      method: "POST",
      body: JSON.stringify(items[i]),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => console.log(res));
  }
}
