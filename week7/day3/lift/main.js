let lift = {
  currentFloor: 1,
  maxFloor: 10,
  minFloor: 1,
  goUpOneFloor: function () {
    if (this.currentFloor === 10) {
      alert("max floor");
    } else {
      $(".lift").animate(
        {
          top: "-=10%",
        },
        500
      );
      this.currentFloor++;
    }
  },
  goDownOneFloor: function () {
    if (this.currentFloor === 1) {
      alert("min floor");
    } else {
      $(".lift").animate(
        {
          top: "+=10%",
        },
        500
      );
      this.currentFloor--;
    }
  },
  goToFloor: function (floor) {
    if (floor > 10 || floor < 1) {
      alert("this floor does not exist, there are only 10 floors");
    } else if (this.currentFloor === floor) {
      alert("you are on this floor");
    } else if (this.currentFloor > floor) {
      for (let i = this.currentFloor; i > floor; i--) {
        this.goDownOneFloor();
      }
    } else {
      for (let i = this.currentFloor; i < floor; i++) {
        this.goUpOneFloor();
      }
    }
  },
};

$(".up").on("click", () => {
  lift.goUpOneFloor();
});

$(".down").on("click", () => {
  lift.goDownOneFloor();
});

$(".goToBtn").on("click", () => {
  let floor = $(".goto").val();
  lift.goToFloor(parseInt(floor));
});

function checkTask() {
  for (q = 0; q < 4; q++) {
    let l = "#";
    for (let cont = 1; cont < 4; cont++) {
      if (cont === 3) {
        l += " # ";
      } else {
        l += " #";
      }
    }
    console.log(l);
    let m = "";
    for (let cont = 0; cont < 4; cont++) {
      m += " #";
    }
    console.log(m);
  }
}

checkTask();
