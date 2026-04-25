
function normalizeAnswer(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

function initPuzzles() {
  document.querySelectorAll("[data-puzzle]").forEach((card) => {
    const input = card.querySelector("[data-answer-input]");
    const button = card.querySelector("[data-check-answer]");
    const feedback = card.querySelector("[data-feedback]");
    const expected = normalizeAnswer(card.dataset.answer);
    const accepted = new Set([expected]);

    // Special accepted alternatives.
    if (expected === "AGUA") accepted.add("ÁGUA");
    if (expected === "4") accepted.add("QUATRO");

    const check = () => {
      const value = normalizeAnswer(input.value);
      if (accepted.has(value)) {
        feedback.textContent = "Resposta aceite.";
        card.querySelector('[data-step="question"]').classList.remove("is-visible");
        card.querySelector('[data-step="success"]').classList.add("is-visible");
        document.body.classList.add("is-unlocked");
      } else {
        feedback.textContent = "Ainda não. O sonho não se abre à pressa.";
        input.focus();
      }
    };

    button?.addEventListener("click", check);
    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") check();
    });
  });
}

function initAudio() {
  const audioKey = document.body.dataset.audio;
  if (!audioKey) return;

  const audio = new Audio(`assets/audio/${audioKey}.mp3`);
  audio.loop = true;
  audio.volume = 0.35;

  let hasStarted = false;

  async function startAudio() {
    if (hasStarted) return;

    try {
      await audio.play();
      hasStarted = true;

      document.removeEventListener("click", startAudio);
      document.removeEventListener("keydown", startAudio);
      document.removeEventListener("touchstart", startAudio);
    } catch (error) {
      console.warn("Audio file missing or blocked:", error);
    }
  }

  // Tenta tocar logo ao carregar.
  startAudio();

  // Se o browser bloquear, começa na primeira interação.
  document.addEventListener("click", startAudio);
  document.addEventListener("keydown", startAudio);
  document.addEventListener("touchstart", startAudio);
}

document.addEventListener("DOMContentLoaded", () => {
  initPuzzles();
  initAudio();
});
