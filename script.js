const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const searchInput = document.getElementById("gameSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const gameCards = document.querySelectorAll(".game-card");
const emptyState = document.getElementById("emptyState");
let activeFilter = "todos";

function updateGames() {
  const search = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  gameCards.forEach(card => {
    const name = card.dataset.name;
    const categories = card.dataset.category.split(" ");
    const matchesSearch = name.includes(search);
    const matchesFilter = activeFilter === "todos" || categories.includes(activeFilter);
    const visible = matchesSearch && matchesFilter;
    card.hidden = !visible;
    if (visible) visibleCount++;
  });

  emptyState.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", updateGames);
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("selected", item === button));
    updateGames();
  });
});

document.getElementById("joinForm").addEventListener("submit", event => {
  event.preventDefault();
  const playerName = document.getElementById("playerName").value.trim();
  const message = document.getElementById("formMessage");
  if (playerName) {
    message.textContent = `¡Bienvenido al universo NEXUS, ${playerName}! Esta demostración todavía no registra cuentas.`;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
