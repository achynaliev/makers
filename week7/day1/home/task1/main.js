let page = 1;
let fivePages = 1;
let pagecount;
let next;
let previous;
let API = "https://pokeapi.co/api/v2/pokemon/";
let pages = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

function render(api) {
  if (page >= 2) {
    $("#prev").removeClass();
  } else {
    $("#prev").addClass("disabled");
  }
  $(".mylist").empty();
  fetch(api)
    .then((res) => res.json())
    .then((pokemons) =>
      pokemons.results.forEach(function (item, index) {
        pagecount = Math.ceil(pokemons.count);
        next = pokemons.next;
        previous = pokemons.previous;
        let pokemon = `<li class="pokemon">${(page - 1) * 20 + (index + 1)} - ${
          item.name
        }</li><div class="info${index}"></div>`;
        $(".mylist").append(pokemon);
        $(".pokemon").each(function (index) {
          $(this).on("click", function (event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            fetch(item.url)
              .then((result) => result.json())
              .then((info) => addInfo(info, index));
          });
        });
      })
    );

  function addInfo(info, index) {
    if ($(`.info${index}`).is(":empty")) {
      let div = $(`.info${index}`).append(
        `<div class="type${index}">Pokemon types: ${info.types[0].type.name}</div><div>Height: ${info.height}</div><div>Weight: ${info.weight}</div><img src="${info.sprites.front_default}">`
      );
      for (let i = 1; i < info.types.length; i++) {
        let text = $(`.type${index}`).text();
        text += ", " + info.types[i].type.name;
        $(`.type${index}`).text(text);
      }
    }
  }
}

if (page === 1) {
  render(API);
}

$("#prev").click(function (e) {
  e.preventDefault();
  render(previous);
  page -= 1;
  if (page === 1) {
    $("#prev").addClass("disabled");
  }
  if (page % 5 === 0) {
    prevPages();
  } else {
    notActive((page + 1) % 5, 0);
  }
});

$("#next").click(function (e) {
  e.preventDefault();
  render(next);
  page += 1;
  if ((page - 1) % 5 === 0) {
    nextPages();
  } else {
    notActive((page - 1) % 5, 1);
  }
});

$("#first").on("click", function (e) {
  let api =
    "https://pokeapi.co/api/v2/pokemon/?offset=" + page * 20 + "&limit=20";
  render(api);
  notActive(page);
  page = fivePages;
  $(this).removeClass();
  $(this).addClass("active");
});

$("#second").on("click", function (e) {
  let api =
    "https://pokeapi.co/api/v2/pokemon/?offset=" +
    (page + 1) * 20 +
    "&limit=20";
  render(api);
  notActive(page);
  page = fivePages + 1;
  $(this).removeClass();
  $(this).addClass("active");
});

$("#third").on("click", function (e) {
  let api =
    "https://pokeapi.co/api/v2/pokemon/?offset=" +
    (page + 2) * 20 +
    "&limit=20";
  render(api);
  notActive(page);
  page = fivePages + 2;
  $(this).removeClass();
  $(this).addClass("active");
});

$("#fourth").on("click", function (e) {
  let api =
    "https://pokeapi.co/api/v2/pokemon/?offset=" +
    (page + 3) * 20 +
    "&limit=20";
  render(api);
  notActive(page);
  page = fivePages + 3;
  $(this).removeClass();
  $(this).addClass("active");
});

$("#fifth").on("click", function (e) {
  let api =
    "https://pokeapi.co/api/v2/pokemon/?offset=" +
    (page + 4) * 20 +
    "&limit=20";
  render(api);
  notActive(page);
  page = fivePages + 4;
  $(this).removeClass();
  $(this).addClass("active");
});

function notActive(index, add) {
  let items = ["first", "second", "third", "fourth", "fifth"];
  index = index % 5;
  if (index === 0) {
    index = 5;
  }
  $(`#${items[index - 1]}`).removeClass();
  if (add === 0) {
    $(`#${items[index - 2]}`).addClass("active");
  } else if (add === 1) {
    $(`#${items[index]}`).addClass("active");
  }
}

function nextPages() {
  fivePages += 5;
  $("#first").find("a").text(`${fivePages}`);
  $("#first").addClass("active");
  $("#second")
    .find("a")
    .text(`${fivePages + 1}`);
  $("#third")
    .find("a")
    .text(`${fivePages + 2}`);
  $("#fourth")
    .find("a")
    .text(`${fivePages + 3}`);
  $("#fifth")
    .find("a")
    .text(`${fivePages + 4}`);
  $("#fifth").removeClass();
}

function prevPages() {
  fivePages -= 5;
  $("#first").find("a").text(`${fivePages}`);
  $("#first").removeClass();
  $("#second")
    .find("a")
    .text(`${fivePages + 1}`);
  $("#third")
    .find("a")
    .text(`${fivePages + 2}`);
  $("#fourth")
    .find("a")
    .text(`${fivePages + 3}`);
  $("#fifth")
    .find("a")
    .text(`${fivePages + 4}`);
  $("#fifth").addClass("active");
}
