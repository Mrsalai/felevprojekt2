const POST_URL = "https://dummyjson.com/recipes/add";

const form = document.getElementById("recept-form");
const uzenet = document.getElementById("uzenet");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const ujRecept = {
    name: form.name.value.trim(),
    cuisine: form.cuisine.value,
    cookTimeMinutes: Number(form.cookTimeMinutes.value),
    difficulty: form.difficulty.value,
    caloriesPerServing: Number(form.caloriesPerServing.value),
  };

  uzenet.textContent = "Submitting recipe...";
  uzenet.className = "allapot";

  try {
    const res = await fetch(POST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ujRecept),
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const adat = await res.json();
    uzenet.textContent = `Recipe submitted! ID: ${adat.id} – ${adat.name} (${adat.cuisine}, ${adat.cookTimeMinutes} min, ${adat.difficulty}, ${adat.caloriesPerServing} kcal)`;
    uzenet.className = "allapot siker";
    form.reset();
  } catch (hiba) {
    uzenet.textContent = `Error: ${hiba.message}`;
    uzenet.className = "allapot hiba";
  }
});
