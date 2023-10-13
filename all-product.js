const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZjE2ZDEzOWM0MzAwMTg4MTQ1NjgiLCJpYXQiOjE2OTcxODIwNjEsImV4cCI6MTY5ODM5MTY2MX0.ohTdDE9qrFCEwPMsmp9juMcJHoKfRPFeZjxYTsNGimE";

async function allProduct() {
  const res = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    const spinner = document.getElementById("spinner");
    if (spinner != null) {
      spinner.classList.add("d-none");
    }
    // console.log(data);
    showAllProducts(data);
  } else {
    alert("Si è verificato un errore nel caricamento");
  }
}

allProduct();

function showAllProducts(data) {
  const addressBarContent = new URLSearchParams(location.search);
  const mod = addressBarContent.get("mod");

  const products = document.getElementById("produts");
  products.innerHTML = "";
  data.forEach((prod) => {
    const col = document.createElement("div");
    col.classList.add("col", "col-12", "col-md-6", "col-lg-4", "col-xl-3");

    if (mod === "true") {
      col.innerHTML += `<div class="card" >
      <img src="${prod.imageUrl}" class="card-img-top" alt="...">
      <div class="card-body">
        <h4 class="card-title">${prod.name}</h4>
        <p class="card-text"><strong>Descrizione</strong></p>
        <p class="card-text">${prod.description}</p>
        <p class="card-text">Marca: ${prod.brand}</p>
        <p class="card-text">Prezzo: ${prod.price} <strong>&euro;</strong></p>
        <a href="back-office.html?id=${prod._id}" class="btn btn-warning">Modifica</a>
        <a href="#" class="btn btn-danger" onclick="deleteProduct('${prod._id}')">Elimina</a>
        </div>
        </div>`;
    } else {
      col.innerHTML = `
        <div class="card" >
  <img src="${prod.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${prod.name}</h4>
    <p class="card-text"><strong>Descrizione</strong></p>
    <p class="card-text">${prod.description}</p>
    <p class="card-text">Marca: ${prod.brand}</p>
    <p class="card-text">Prezzo: ${prod.price} <strong>&euro;</strong></p>
    </div>
        </div>`;
    }

    products.appendChild(col);
  });
}

async function deleteProduct(id) {
  const res = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
  if (res.ok) {
    alert("Prodotto Eliminato Correttamente");
    allProduct();
  } else {
    alert("Errori nell'eliminazione del prodotto");
  }
}
