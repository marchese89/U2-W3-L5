const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjE2ZDEzOWM0MzAwMTg4MTQ1NjgiLCJpYXQiOjE2OTcxODIwNjEsImV4cCI6MTY5ODM5MTY2MX0.ohTdDE9qrFCEwPMsmp9juMcJHoKfRPFeZjxYTsNGimE";

const addressBarContent = new URLSearchParams(location.search);
const id = addressBarContent.get("id");
if (id != null) {
  fillProduct(id);
  document.getElementById("form-btn").innerHTML = `
  <button class="btn btn-warning">Modifica</button>
  `;
}

async function fillProduct() {
  const res = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + id,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
  if (res.ok) {
    const prod = await res.json();
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

const createForm = document.getElementById("create-product");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = document.forms["create-product"].getElementsByTagName("input");
  const product = {};
  const inputsArray = Array.from(inputs);
  inputsArray.forEach((input) => {
    product[input.id] = input.value;
  });
  if (id == null) {
    createProduct(product);
  } else {
    changeProduct(product);
  }
});

async function changeProduct(product) {
  const res = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + id,
    {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
  if (res.ok) {
    alert("Prodotto Modificato Correttamente");
    fillProduct();
  } else {
    alert("Errori nella modifica del prodotto");
  }
}

async function createProduct(product) {
  const res = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
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
reset.addEventListener("click", formReset);
