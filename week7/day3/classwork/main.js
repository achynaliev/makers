let API = "http://localhost:3000/products?_page=1&_limit=3";

let productName = $("#productName");
let productPrice = $("#productPrice");
let productDesc = $("#productDesc");
let btnSave = $(".btnSave");
let modal = $(".modal");
let productImg = $("#productImg");
let productURL = $("#productURL");
let prev = $(".prev");
let next = $(".next");
let currentPage = 1;

async function addProduct() {
  let name = productName.val();
  let price = productPrice.val();
  let desc = productDesc.val();
  let img = productDesc.val();

  let product = {
    name,
    price,
    desc,
    img,
  };

  try {
    const response = await axios.post(API, product);
    console.log(response);
    Toastify({
      text: response.statusText,
      duration: 1000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    modal.modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  } catch (err) {
    Toastify({
      text: err.response.statusText,
      duration: 1000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "red",
      },
    }).showToast();
    modal.modal("toggle");
  }
}

btnSave.click(function (e) {
  e.preventDefault();
  addProduct();
});

let list = $(".list");

async function render(url) {
  try {
    const response = await axios(url);
    console.log(response.headers.link);
    list.html("");
    response.data.forEach((item) => {
      list.append(`
  <div class="card" style="width: 18rem;">
<img style="width: 100%; object-fit: contain; height: 190px" src=${item.image} class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${item.name} </h5>
  <p class="card-text">${item.desc}</p>
  <a href="#">${item.price}</a>
  <button id="${item.id}" type="button class="btn btn-primary editBtn" data-bs-toggle="modal" data-bs-target="#editModal">Edit product</button>
</div>
</div>
  `);
    });

    let links = response.headers.link.match(
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
    );
    console.log(links.length);
    if (!links) {
      prev.attr("disabled", "true");
      next.attr("disabled", "true");
      return;
    }
    if (links.length === 4) {
      prev.attr("id", links[1]);
      next.attr("id", links[2]);
      prev.removeAttr("disabled");
      next.removeAttr("disabled");
    } else if (links.length === 3 && currentPage === 1) {
      prev.attr("disabled", "true");
      next.attr("id", links[1]);
    } else if (links.length === 3 && currentPage != 1) {
      next.attr("disabled", "true");
      prev.attr("id", links[1]);
    }
  } catch (e) {
    console.log(e);
  }
}
render(API);
next.on("click", (e) => {
  let url = e.target.id;
  render(url);
  currentPage++;
});
prev.on("click", (e) => {
  let url = e.target.id;
  render(url);
  currentPage--;
});

// ! Search

let searchInput = $("#inputSearch");
searchInput.on("input", function (e) {
  let val = e.target.value;
  let url = API + `&q=${val}`;
  render(url);
  currentPage = 1;
});

$(document).on("click", ".editBtn", (e) => {
  let id = e.target.id;
  console.log(id);
});
