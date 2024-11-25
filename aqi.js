let bairrosData = []; // Variável global para armazenar os dados dos bairros

async function fetchAirQualityData() {
  try {
    const loadingElement = document.getElementById("loading");
    loadingElement.style.display = "block";

    // Se os dados já foram carregados, não faça o fetch novamente
    if (bairrosData.length > 0) return bairrosData;

    const response = await fetch("https://co2ntrol-api-eory.onrender.com/");
    const data = await response.json();
    bairrosData = data.bairros; // Armazena os dados em cache

    loadingElement.style.display = "none";

    return bairrosData; // Retorna os dados para serem usados em outros lugares
  } catch (error) {
    console.log("Erro ao obter dados de qualidade do ar:", error);
    loadingElement.style.display = "none";

    return [];
  }
}

function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function displayData(bairros, order = "none") {
  const container = document.getElementById("bairros-container");
  container.innerHTML = "";

  let bairrosArray = Object.entries(bairros);

  // Ordena os dados se o parâmetro "order" for passado
  if (order === "asc") {
    bairrosArray = bairrosArray.sort(
      (a, b) => b[1].qualidadeAr - a[1].qualidadeAr
    );
  } else if (order === "desc") {
    bairrosArray = bairrosArray.sort(
      (a, b) => a[1].qualidadeAr - b[1].qualidadeAr
    );
  }

  bairrosArray.forEach(([bairro, info]) => {
    const aqi = info.qualidadeAr;

    let qualidadeClasse = "";
    let msgQualidadeAr = "";
    let recomendacoes = "";

    let qualidadeArOtimo = aqi == 1 || aqi == 2;
    let qualidadeArRazoavel = aqi == 3;
    let qualidadeArRuim = aqi == 4;
    let qualidadeArTerrivel = aqi == 5;

    if (qualidadeArOtimo) {
      qualidadeClasse = "bairro-container-otimo";
      msgQualidadeAr = "Ótimo😆";
      recomendacoes = "Aproveite atividades ao ar livre!";
    } else if (qualidadeArRazoavel) {
      qualidadeClasse = "bairro-container-razoavel";
      msgQualidadeAr = "Razoável😐";
      recomendacoes = "Aproveite, mas evite exposição excessiva";
    } else if (qualidadeArRuim) {
      qualidadeClasse = "bairro-container-ruim";
      msgQualidadeAr = "Ruim😢";
      recomendacoes = "Evite longas exposições ao ar livre.";
    } else if (qualidadeArTerrivel) {
      qualidadeClasse = "bairro-container-terrivel";
      msgQualidadeAr = "Terrível💀";
      recomendacoes = "Permaneça em locais fechados e use máscara.";
    } else {
      qualidadeClasse = "bairro-container-indisponivel";
      recomendacoes = "Dados indisponíveis";
    }

    const bairroDiv = document.createElement("div");
    bairroDiv.classList.add("bairro-container", qualidadeClasse);
    bairroDiv.setAttribute("data-bairro", bairro);

    const bairroNome = capitalizeWords(bairro.replaceAll("_", " "));

    bairroDiv.innerHTML = `
            <div class="bairro-titulo">
              <h2>${bairroNome}</h2>
            </div>
            <p><strong>Qualidade do ar:</strong> ${msgQualidadeAr}</p>
            <p><strong>Recomendações:</strong> ${recomendacoes}</p>
          `;
    container.appendChild(bairroDiv);
  });
}

function filterBairros(searchValue) {
  const bairrosFiltrados = Object.entries(bairrosData).filter(([bairro]) => {
    return bairro.toLowerCase().includes(searchValue.toLowerCase());
  });

  displayData(Object.fromEntries(bairrosFiltrados));
}

document
  .getElementById("search-input")
  .addEventListener("input", function (event) {
    const searchValue = event.target.value;
    filterBairros(searchValue);
  });

export { fetchAirQualityData, displayData };
