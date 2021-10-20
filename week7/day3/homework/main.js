let currentPage = 1;
let API = "http://localhost:3000/contacts?_page=1&_limit=6";
let APIs = "http://localhost:3000/contacts/";

let fullname = $("#fullnameInp");
let emailContact = $("#emailInp");
let phonenumber = $("#phonenumber");
let btnSave = $(".btnSave");
let modal = $(".modal");
let prev = $(".prev");
let next = $(".next");

async function addProduct() {
  let fullName = fullname.val();
  let email = emailContact.val();
  let phoneNumber = phonenumber.val();

  let contact = {
    fullName,
    email,
    phoneNumber,
  };

  try {
    const response = await axios.post(APIs, contact);
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
    console.log(err);
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
    modal.modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  }
  render("http://localhost:3000/contacts?_page=" + currentPage + "&_limit=6");
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
<div class="card-body">
  <h5 class="card-title">${item.fullName} </h5>
  <p class="card-text">${item.email}</p>
  <a href="#">${item.phoneNumber}</a>
  <br />
  <button id="${item.id}" type="button" class="btn btn-primary edit-btn" data-bs-toggle="modal" data-bs-target="#editModal">Edit product</button>
</div>
</div>
  `);
    });

    let links = response.headers.link.match(
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
    );
    if (!links) {
      prev.attr("disabled", "true");
      next.attr("disabled", "true");
      return;
    }
    if (links[0] === links[1]) {
      prev.removeAttr("disabled");
    }
    if (links[1] === links[2]) {
      next.removeAttr("disabled");
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

let fullnameEdit = $("#fullnameEdit");
let emailContactEdit = $("#emailEdit");
let phonenumberEdit = $("#phonenumberEdit");
$(document).on("click", ".edit-btn", async (e) => {
  let id = e.target.id;
  console.log($(this));
  try {
    const response = await axios(`${APIs}${id}`);

    fullnameEdit.val(response.data.fullName);
    emailContactEdit.val(response.data.email);
    phonenumberEdit.val(response.data.phoneNumber);
    $(".edit-btn").attr("id", id);
    $(".DeleteContact").attr("id", id);
    $(".saveChanges").prop("id", id);
    getContact(id);
  } catch (e) {
    console.log(e);
  }
  // console.log(e.target);
});

async function getContact(id) {
  console.log(id);
  let contact = await axios(`${APIs}${id}`);
  contact = contact.data;
  console.log(`${APIs}${id}`);
  fullnameEdit.val(contact.fullName);
  emailContactEdit.val(contact.email);
  phonenumberEdit.val(contact.phoneNumber);
}

$(".saveChanges").on("click", async function (e) {
  let fullName = fullnameEdit.val();
  let email = emailContactEdit.val();
  let phoneNumber = phonenumberEdit.val();

  let id = $(".saveChanges").attr("id");
  console.log(id);
  let contact = {
    fullName,
    email,
    phoneNumber,
  };
  try {
    let res = await axios.put(APIs + id, contact);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
  modal.modal("hide");
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
  render("http://localhost:3000/contacts?_page=" + currentPage + "&_limit=6");
});

$(".DeleteContact").on("click", async function (e) {
  let id = $(".DeleteContact").attr("id");
  try {
    let res = await axios.delete(APIs + id);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
  modal.modal("hide");
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
  render("http://localhost:3000/contacts?_page=" + currentPage + "&_limit=6");
});
