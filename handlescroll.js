// Função para verificar a posição do scroll e controlar a visibilidade do botão
function handleScroll() {
  const topButton = document.getElementById("top-button");
  const header = document.querySelector("header");

  // Verifica se a rolagem ultrapassou o topo do header
  if (window.scrollY > header.offsetHeight) {
    topButton.style.opacity = 1;
  } else {
    topButton.style.opacity = 0;
  }
}

window.addEventListener("scroll", handleScroll);
handleScroll(); // Chama a função uma vez para verificar o estado inicial
