const randomDoboz = document.getElementById("random-recept");
const gomb = document.getElementById("uj-gomb");
const allapot = document.getElementById("allapot");

function ujElem(tag, szoveg = "") {
  const el = document.createElement(tag);
  el.textContent = szoveg;
  return el;
}

async function betoltRandom() {
  allapot.textContent = "Loading random recipe...";
  allapot.className = "allapot";
  try {
    const id = Math.floor(Math.random() * 50) + 1;
    const res = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const r = await res.json();
    randomDoboz.textContent = "";

    const kep = ujElem("img");
    kep.src = r.image;
    kep.alt = r.name;

    const hozzavalok = ujElem("ul");
    for (const h of r.ingredients) hozzavalok.append(ujElem("li", h));

    const lepesek = ujElem("ol");
    for (const l of r.instructions) lepesek.append(ujElem("li", l));

    const ido = r.prepTimeMinutes + r.cookTimeMinutes;
    randomDoboz.append(
      kep,
      ujElem("h3", r.name),
      ujElem("p", `${r.cuisine} | ${ido} min | ${r.difficulty}`),
      ujElem("h4", "Ingredients"),
      hozzavalok,
      ujElem("h4", "Instructions"),
      lepesek
    );

    allapot.textContent = "";
  } catch (hiba) {
    allapot.textContent = `Error: ${hiba.message}`;
    allapot.className = "allapot hiba";
  }
}

gomb.addEventListener("click", betoltRandom);
betoltRandom();
