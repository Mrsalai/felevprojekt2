const API = "https://dummyjson.com/recipes?limit=0";

const receptLista = document.getElementById("recept-lista");
const kereses = document.getElementById("kereses");
const rendezes = document.getElementById("rendezes");
const allapot = document.getElementById("allapot");

let receptek = []; // eredeti tömb, ezt nem módosítjuk

function ujElem(tag, szoveg = "") {
  const el = document.createElement(tag);
  el.textContent = szoveg;
  return el;
}

function render(lista) {
  receptLista.textContent = "";
  if (lista.length === 0) {
    receptLista.append(ujElem("p", "No matching recipes found."));
    return;
  }

  for (const r of lista) {
    const kartya = ujElem("article");
    kartya.className = "kartya";

    const kep = ujElem("img");
    kep.src = r.image;
    kep.alt = r.name;

    const ido = r.prepTimeMinutes + r.cookTimeMinutes;
    kartya.append(
      kep,
      ujElem("h3", r.name),
      ujElem("p", `${r.cuisine} | ${ido} min | ${r.difficulty}`)
    );
    receptLista.append(kartya);
  }
}

function frissit() {
  const szo = kereses.value.trim().toLowerCase();

  // filter új tömböt ad vissza, így az eredeti receptek tömb nem sérül
  const szurt = receptek.filter(
    (r) => r.name.toLowerCase().includes(szo) || r.cuisine.toLowerCase().includes(szo)
  );

  szurt.sort((a, b) => {
    if (rendezes.value === "ido") {
      return (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes);
    }
    return a.name.localeCompare(b.name);
  });

  allapot.textContent = `Results: ${szurt.length} recipes`;
  render(szurt);
}

async function betolt() {
  allapot.textContent = "Loading recipes...";
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const adat = await res.json();
    receptek = adat.recipes;
    frissit();
  } catch (hiba) {
    allapot.textContent = `Error: ${hiba.message}`;
    allapot.className = "allapot hiba";
  }
}

kereses.addEventListener("input", frissit);
rendezes.addEventListener("change", frissit);
betolt();
