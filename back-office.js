const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjE2ZDEzOWM0MzAwMTg4MTQ1NjgiLCJpYXQiOjE2OTcxODIwNjEsImV4cCI6MTY5ODM5MTY2MX0.ohTdDE9qrFCEwPMsmp9juMcJHoKfRPFeZjxYTsNGimE";

const URL_API = "https://striveschool-api.herokuapp.com/api/product/";

const addressBarContent = new URLSearchParams(location.search);
const id = addressBarContent.get("id");
const view = addressBarContent.get("view");

if (view != null) {
  const inputs = document.forms["create-product"].getElementsByTagName("input");
  const inputsArray = Array.from(inputs);
  inputsArray.forEach((input) => {
    input.readOnly = true;
  });
}

if (id != null) {
  fillProduct(id);
  if (view == null) {
    document.getElementById("form-btn").innerHTML = `
  <button class="btn btn-warning">Modifica</button>
  `;
  } else {
    document.getElementById("form-btn").innerHTML = "";
    document.getElementById("reset").parentElement.innerHTML = "";
    document.getElementsByTagName("h1")[0].innerText = "Dettagli prodotto";
    document.getElementsByTagName("h3")[0].remove();
  }
}

async function fillProduct() {
  const res = await fetch(URL_API + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
  if (res.ok) {
    const prod = await res.json();
    const immagine = document.getElementById("img");
    if (immagine != null) {
      immagine.setAttribute("src", prod.imageUrl);
    }
    const inputs =
      document.forms["create-product"].getElementsByTagName("input");
    const inputsArray = Array.from(inputs);
    inputsArray.forEach((input) => {
      input.value = prod[input.id];
    });
  } else {
    alert("errore nel caricamento del prodotto");
  }
}

const regex = /[0-9]{1,}([.,]{1}[0-9]{2}){0,1}/;

const createForm = document.getElementById("create-product");
createForm.addEventListener("submit", (e) => {
  let toSubmit = true;
  e.preventDefault();
  const inputs = document.forms["create-product"].getElementsByTagName("input");
  const product = {};
  const inputsArray = Array.from(inputs);
  inputsArray.forEach((input) => {
    product[input.id] = input.value;
    if (input.id === "price" && !regex.test(input.value)) {
      input.classList.add("bg-danger");
      toSubmit = false;
    } else {
      if (input.classList.contains("bg-danger")) {
        input.classList.remove("bg-danger");
      }
    }
  });
  if (toSubmit) {
    if (id == null) {
      createProduct(product);
    } else {
      changeProduct(product);
    }
  }
});

async function changeProduct(product) {
  const res = await fetch(URL_API + id, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
  if (res.ok) {
    alert("Prodotto Modificato Correttamente");
    fillProduct();
  } else {
    alert("Errori nella modifica del prodotto");
  }
}

async function createProduct(product) {
  const res = await fetch(URL_API, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
  if (res.ok) {
    alert("prodotto creato correttamente");
  } else {
    alert("errore nell'inserimento del prodotto");
  }
  //azzero il form
  formReset();
}

function formReset() {
  const inputs = document.forms["create-product"].getElementsByTagName("input");
  const inputsArray = Array.from(inputs);
  inputsArray.forEach((input) => {
    input.value = "";
  });
}

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  const confirm = window.confirm("Sicuro di voler fare il RESET del form?");
  if (confirm) {
    formReset();
  }
});
