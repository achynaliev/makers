let arrOfWords = [
  {
    word: "makaka",
    desc: "Порода обезьяны",
  },
  {
    word: "wkola",
    desc: "Овощь",
  },
  {
    word: "university",
    desc: "11 лет",
  },
  {
    word: "class",
    desc: "носить на плече",
  },
  {
    word: "proshka",
    desc: "Ёмкость для напитков",
  },
];
let textDiv = $(".text-div");
let arrOfDivs = [
  $(".verevka"),
  $(".head-1"),
  $(".body-1"),
  $(".r-hand"),
  $(".l-hand"),
  $(".r-foot"),
  $(".l-foot"),
];
let countMistakes = 0;

function render1() {
  let randomObject =
    arrOfWords[Math.round(Math.random() * (arrOfWords.length - 1))];
  console.log(randomObject);
  let word = randomObject.word;
  let desc = randomObject.desc;
  arrOfDivs.forEach((item) => {
    item.css("display", "none");
  });

  countMistakes = 0;

  for (let i = 0; i < word.length; i++) {
    textDiv.append(
      `<input type="text" maxlength="1" class="text" id="text-${i}" value="x" />`
    );
  }
  $("h3").text(`${word}`);
  $(document).on("keypress", function (e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    let letter = e.key;

    let hz = false;
    for (let i = 0; i < word.length; i++) {
      if (letter === word[i]) {
        $(`#text-${i}`).val(`${letter}`);
        $(`#text-${i}`).css("color", "blue");
        hz = true;
      }
    }

    if (hz === false) {
      arrOfDivs[countMistakes].css("display", "block");
      countMistakes++;

      if (countMistakes === 7) {
        alert(`Вы проиграли, правильное слово: ${word}`);
        return;
      }
    }
    let bool = true;
    $(".text").each((i, item) => {
      if (item.value === "x") {
        bool = false;
      }
    });
    if (bool) {
      alert(`Победа, слово: ${word}`);
      return;
    }
    console.log(countMistakes);
  });
}

let btnStart = $("#btn-start");
btnStart.on("click", function (e) {
  $("input").empty();
  $(".text").each((i, item) => {
    item.text = "";
  });
  $(".text-div").empty();
  render1();
});
