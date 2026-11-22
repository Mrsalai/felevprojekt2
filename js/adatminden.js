async function receptKereses(nev) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(nev)}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
    }

    const data = await response.json();

    // Ha nincs találat, a data.meals értéke null lesz
    if (!data.meals) {
      console.log("Nincs találat erre a keresésre.");
      return [];
    }

    console.log("Talált ételek:", data.meals);
    return data.meals;

  } catch (error) {
    console.error("Hiba történt az API lekérés során:", error);
  }
}

