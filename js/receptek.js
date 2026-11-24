const API = "https://dummyjson.com/recipes?limit=0";

const tablazat = document.getElementById("recept-tablazat");
const allapot = document.getElementById("allapot");

function ujElem(tag, szoveg = "") {
  const el = document.createElement(tag);
  el.textContent = szoveg;
  return el;
}

async function betoltTablazat() {
  allapot.textContent = "Loading recipes...";
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const adat = await res.json();
    tablazat.textContent = "";

    for (const r of adat.recipes) {
      const sor = ujElem("tr");
      const nev = ujElem("th", r.name);
      nev.scope = "row";

      const ido = r.prepTimeMinutes + r.cookTimeMinutes;
      sor.append(
        nev,
        ujElem("td", r.cuisine),
        ujElem("td", `${ido} min`),
        ujElem("td", r.difficulty),
        ujElem("td", `${r.caloriesPerServing} kcal`)
      );
      tablazat.append(sor);
    }

    allapot.textContent = `Total: ${adat.recipes.length} recipes loaded.`;
  } catch (hiba) {
    allapot.textContent = `Error: ${hiba.message}`;
    allapot.className = "allapot hiba";
  }
}

betoltTablazat();
