let API = "https://restcountries.com/v3.1/name/";
var input;

$("#show").click(function (e) {
  let name = $("#country-name").val();
  fetch(API + name)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Country not found");
      }
    })
    .then((responseJson) => {
      renderCoutries(responseJson);
    })
    .catch((error) => {
      alert(error);
    });
});

function renderCoutries(results) {
  console.log(results[0]);
  $("#name").text(`${results[0].name.official}`);
  $("#region").text(`${results[0].region}`);
  $("#subregion").text(`${results[0].subregion}`);
  $("#capital").text(`${results[0].capital[0]}`);
  $("#flag").text(`${results[0].flag}`);
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((response) => top5(response));

function top5(response) {
  let top = [];
  for (let i = 0; i < response.length; i++) {
    if (top.length < 5) {
      top.push(response[i]);
    } else {
      if (response[i].population > top[0].population) {
        top.shift();
        top.unshift(response[i]);
        top.sort((a, b) => a.population - b.population);
      }
    }
  }
  renderTopCoutries(top);
}

function renderTopCoutries(top) {
  for (let item of top) {
    let elem = `<tr>
      <td>${item.flag}</td>
      <td>${item.name.common}</td>
      <td>${item.capital}</td>
      <td>${item.area}</td>
      <td>${item.population}</td>
      <td>${Math.floor(item.population / item.area)}</td>
      </tr>`;
    $("tbody").append(elem);
  }
}
