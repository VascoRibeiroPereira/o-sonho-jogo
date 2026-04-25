function normalizeAnswer(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

function getAcceptedAnswers(expected) {
  const normalizedExpected = normalizeAnswer(expected);
  const accepted = new Set([normalizedExpected]);

  // Special accepted alternatives.
  if (normalizedExpected === "AGUA") accepted.add(normalizeAnswer("ÁGUA"));
  if (normalizedExpected === "4") accepted.add(normalizeAnswer("QUATRO"));

  return accepted;
}

function showPuzzleStep(container, stepName) {
  const steps = container.querySelectorAll(".puzzle-step");

  steps.forEach((step) => {
    step.classList.remove("is-visible");
  });

  const nextStep = container.querySelector(`[data-step="${stepName}"]`);

  if (nextStep) {
    nextStep.classList.add("is-visible");
  }
}

function initPuzzles() {
  document.querySelectorAll("[data-puzzle]").forEach((card) => {
    const input = card.querySelector("[data-answer-input]");
    const button = card.querySelector("[data-check-answer]");
    const feedback = card.querySelector("[data-feedback]");
    const accepted = getAcceptedAnswers(card.dataset.answer);

    const check = () => {
      const value = normalizeAnswer(input?.value);

      if (accepted.has(value)) {
        if (feedback) feedback.textContent = "Resposta aceite.";

        const questionStep = card.querySelector('[data-step="question"]');
        const successStep = card.querySelector('[data-step="success"]');

        if (questionStep) questionStep.classList.remove("is-visible");
        if (successStep) successStep.classList.add("is-visible");

        document.body.classList.add("is-unlocked");
      } else {
        if (feedback) feedback.textContent = "Tenta novamente.";
        input?.focus();
      }
    };

    button?.addEventListener("click", check);

    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") check();
    });
  });
}

function initMultiPuzzles() {
  document.querySelectorAll("[data-multi-puzzle]").forEach((card) => {
    const answerButtons = card.querySelectorAll("[data-check-multi-answer]");
    const showStepButtons = card.querySelectorAll("[data-show-step]");

    answerButtons.forEach((button) => {
      const check = () => {
        const expectedAnswer = button.dataset.answer;
        const currentStep = button.dataset.currentStep;
        const nextStep = button.dataset.nextStep;
        const accepted = getAcceptedAnswers(expectedAnswer);

        const stepElement = card.querySelector(`[data-step="${currentStep}"]`);
        const input = stepElement?.querySelector(".answer-input");
        const feedback = stepElement?.querySelector(".feedback");
        const value = normalizeAnswer(input?.value);

        if (accepted.has(value)) {
          if (feedback) feedback.textContent = "Resposta aceite.";
          showPuzzleStep(card, nextStep);

          if (nextStep && nextStep.includes("success")) {
            document.body.classList.add("is-unlocked");
          }
        } else {
          if (feedback) feedback.textContent = "Tenta novamente.";
          input?.focus();
        }
      };

      button.addEventListener("click", check);

      const currentStep = button.dataset.currentStep;
      const stepElement = card.querySelector(`[data-step="${currentStep}"]`);
      const input = stepElement?.querySelector(".answer-input");

      input?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") check();
      });
    });

    showStepButtons.forEach((button) => {
      button.addEventListener("click", () => {
        showPuzzleStep(card, button.dataset.showStep);
      });
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
  initMultiPuzzles();
  initAudio();
});