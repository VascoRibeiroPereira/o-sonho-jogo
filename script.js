const KEY_PROGRESS = "osonho_progress_v1";

const keys = [
  { id: "air", number: "I", name: "Ar", available: true },
  { id: "key2", number: "II", name: "bloqueada", available: false },
  { id: "key3", number: "III", name: "bloqueada", available: false },
  { id: "key4", number: "IV", name: "bloqueada", available: false },
  { id: "key5", number: "V", name: "bloqueada", available: false },
  { id: "key6", number: "VI", name: "bloqueada", available: false },
  { id: "key7", number: "VII", name: "bloqueada", available: false },
];

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY_PROGRESS)) || { unlocked: [] };
  } catch {
    return { unlocked: [] };
  }
}

function saveProgress(progress) {
  localStorage.setItem(KEY_PROGRESS, JSON.stringify(progress));
}

function unlockKey(id) {
  const progress = loadProgress();
  if (!progress.unlocked.includes(id)) {
    progress.unlocked.push(id);
    saveProgress(progress);
  }
  renderProgress();
}

function isUnlocked(id) {
  return loadProgress().unlocked.includes(id);
}

function renderProgress() {
  const progress = loadProgress();
  const count = progress.unlocked.length;
  const counter = document.getElementById("progress-count");
  const grid = document.getElementById("keys-grid");

  if (counter) counter.textContent = `${count} / 7`;
  document.body.classList.toggle("key-air-unlocked", isUnlocked("air"));

  if (!grid) return;

  grid.innerHTML = keys.map((key) => {
    const unlocked = progress.unlocked.includes(key.id);
    const href = key.id === "air" ? "#chave1" : "#chaves";
    return `
      <a class="key-tile ${unlocked ? "unlocked" : ""}" href="${href}" aria-label="Chave ${key.number}: ${key.name}">
        <span class="key-number">${key.number}</span>
        <p class="key-name">${unlocked ? key.name : key.name}</p>
        <p class="key-state">${unlocked ? "desbloqueada" : key.available ? "disponível" : "por revelar"}</p>
      </a>
    `;
  }).join("");
}

function showRoute() {
  const hash = window.location.hash || "#home";
  const views = document.querySelectorAll(".view");
  const selected = document.querySelector(hash);

  views.forEach((view) => view.classList.remove("active"));

  if (selected && selected.classList.contains("view")) {
    selected.classList.add("active");
  } else {
    document.getElementById("home").classList.add("active");
  }

  renderProgress();
}

function setFeedback(id, message, type = "") {
  const element = document.getElementById(`feedback-${id}`);
  if (!element) return;
  element.className = `feedback ${type}`;
  element.textContent = message;
}

function normalizeAnswer(value) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function handleCheck(step) {
  if (step === "1") {
    const answer = normalizeAnswer(document.getElementById("answer-1").value);
    if (["4", "QUATRO", "IV"].includes(answer)) {
      setFeedback("1", "Certo. Quatro sinais contra a queda.", "ok");
      document.getElementById("step-2").classList.remove("hidden");
      document.getElementById("answer-2").focus();
    } else {
      setFeedback("1", "Ainda não. Há formas presas à água que parecem apontar para cima.", "error");
    }
  }

  if (step === "2") {
    const answer = normalizeAnswer(document.getElementById("answer-2").value);
    if (["XXIV", "IVXX"].includes(answer)) {
      setFeedback("2", "O símbolo respira.", "ok");
      document.getElementById("unlock").classList.remove("hidden");
      unlockKey("air");
    } else {
      setFeedback("2", "O símbolo ainda não respira. Pensa em números escritos como letras.", "error");
    }
  }
}

function handleHint(step) {
  if (step === "1") {
    setFeedback("1", "Pista: procura figuras que pertencem à água, mas cujo movimento desafia a gravidade.", "ok");
  }
  if (step === "2") {
    setFeedback("2", "Pista: quatro em romano é IV. O século indicado é XX.", "ok");
  }
}

document.addEventListener("click", (event) => {
  const check = event.target.closest("[data-check]");
  const hint = event.target.closest("[data-hint]");

  if (check) handleCheck(check.dataset.check);
  if (hint) handleHint(hint.dataset.hint);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  if (event.target.id === "answer-1") handleCheck("1");
  if (event.target.id === "answer-2") handleCheck("2");
});

window.addEventListener("hashchange", showRoute);
window.addEventListener("DOMContentLoaded", showRoute);
