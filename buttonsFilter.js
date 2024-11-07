import { fetchAirQualityData, displayData } from "./aqi.js";

let bairrosData = [];

async function initialize() {
  bairrosData = await fetchAirQualityData(); // Armazena os dados para acesso futuro
  displayData(bairrosData); // Exibe todos os bairros inicialmente
}

const buttonsFilter = document.querySelectorAll(".filtros-container button");

buttonsFilter.forEach((button) => {
  button.addEventListener("click", () => {
    buttonsFilter.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");

    if (button.innerText === "Todos") {
      displayData(bairrosData);
    } else if (button.innerText === "Melhores bairros") {
      displayData(bairrosData, "desc");
    } else if (button.innerText === "Piores bairros") {
      displayData(bairrosData, "asc");
    }
  });
});

initialize();
