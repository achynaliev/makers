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
