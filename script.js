
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
  const buttons = document.querySelectorAll("[data-audio-toggle]");
  if (!audioKey || !buttons.length) return;

  const audio = new Audio(`assets/audio/${audioKey}.mp3`);
  audio.loop = true;
  audio.volume = 0.45;

  let isPlaying = false;

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        if (!isPlaying) {
          await audio.play();
          isPlaying = true;
          button.textContent = "Som: ligado";
        } else {
          audio.pause();
          isPlaying = false;
          button.textContent = "Som: desligado";
        }
      } catch (error) {
        button.textContent = "Som indisponível";
        console.warn("Audio file missing or blocked:", error);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPuzzles();
  initAudio();
});
