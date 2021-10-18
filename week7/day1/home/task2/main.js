let API = "https://goweather.herokuapp.com/weather/";
var input;

$(".show").click(function (e) {
  input = $(".input").val();
  fetch(API + input)
    .then((res) => res.json())
    .then((results) => showRes(results, input));
});

function showRes(results) {
  if (results.wind === "" && results.temperature === "") {
    alert("город не найден!");
    $(".input").val("");
  } else {
    $(".today").empty();
    $(".input").val("");
    $(".today")
      .append(`<div class="city">${input}</div></div><div class="today">today</div><div class="temp">${results.temperature}</div>
        <div class="wind">${results.wind}</div><div class="desc">${results.description}</div>
        <div class="tomorrow">tomorrow</div><div class="temp">${results.forecast[0].temperature}</div>
        <div class="wind">${results.forecast[0].wind}</div><div class="tomorrow">the day after</div><div class="temp">${results.forecast[1].temperature}</div>
        <div class="wind">${results.forecast[1].wind}</div><div class="tomorrow">the day after next</div><div class="temp">${results.forecast[2].temperature}</div>
        <div class="wind">${results.forecast[2].wind}</div>`);
  }
}
