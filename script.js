const tenses = [
  {
    key: "past_simple",
    name: "Past Simple",
    time: "PAST",
    aspect: "SIMPLE",
    x: 24,
    y: 70,
    formula: "V²",
    example: "Bjorn opened the door.",
    translation: "Бьйорн открыл дверь.",
    description: "A finished action that happened in the past."
  },
  {
    key: "present_simple",
    name: "Present Simple",
    time: "PRESENT",
    aspect: "SIMPLE",
    x: 43,
    y: 50,
    formula: "V / V-s",
    example: "Bjorn lives near the forest.",
    translation: "Бьйорн живёт возле леса.",
    description: "A fact, habit, or something that is generally true."
  },
  {
    key: "future_simple",
    name: "Future Simple",
    time: "FUTURE",
    aspect: "SIMPLE",
    x: 76,
    y: 30,
    formula: "will + V",
    example: "Bjorn will come back tomorrow.",
    translation: "Бьйорн вернётся завтра.",
    description: "A future action, prediction, promise, or decision."
  },
  {
    key: "past_continuous",
    name: "Past Continuous",
    time: "PAST",
    aspect: "CONTINUOUS",
    x: 76,
    y: 70,
    formula: "was / were + V-ing",
    example: "Bjorn was waiting for me.",
    translation: "Бьйорн ждал меня.",
    description: "An action that was in progress at a particular moment in the past."
  },
  {
    key: "present_continuous",
    name: "Present Continuous",
    time: "PRESENT",
    aspect: "CONTINUOUS",
    x: 57,
    y: 50,
    formula: "am / is / are + V-ing",
    example: "Bjorn is waiting for me.",
    translation: "Бьйорн ждёт меня.",
    description: "An action happening now or around the present moment."
  },
  {
    key: "future_continuous",
    name: "Future Continuous",
    time: "FUTURE",
    aspect: "CONTINUOUS",
    x: 76,
    y: 50,
    formula: "will be + V-ing",
    example: "Bjorn will be waiting for me at eight.",
    translation: "В восемь Бьйорн будет ждать меня.",
    description: "An action that will be in progress at a particular future moment."
  },
  {
    key: "past_perfect",
    name: "Past Perfect",
    time: "PAST",
    aspect: "PERFECT",
    x: 24,
    y: 30,
    formula: "had + V³",
    example: "Bjorn had left before I arrived.",
    translation: "Бьйорн ушёл до того, как я пришёл.",
    description: "An action completed before another event in the past."
  },
  {
    key: "present_perfect",
    name: "Present Perfect",
    time: "PRESENT",
    aspect: "PERFECT",
    x: 43,
    y: 30,
    formula: "have / has + V³",
    example: "Bjorn has already left.",
    translation: "Бьйорн уже ушёл.",
    description: "A past action whose result or experience matters now."
  },
  {
    key: "future_perfect",
    name: "Future Perfect",
    time: "FUTURE",
    aspect: "PERFECT",
    x: 76,
    y: 70,
    formula: "will have + V³",
    example: "Bjorn will have finished by tomorrow.",
    translation: "К завтрашнему дню Бьйорн уже закончит.",
    description: "An action that will be completed before a point in the future."
  },
  {
    key: "past_perfect_continuous",
    name: "Past Perfect Continuous",
    time: "PAST",
    aspect: "PERFECT CONTINUOUS",
    x: 57,
    y: 70,
    formula: "had been + V-ing",
    example: "Bjorn had been waiting for an hour when I arrived.",
    translation: "Бьйорн ждал уже час, когда я пришёл.",
    description: "An ongoing action that continued for a period before a past moment."
  },
  {
    key: "present_perfect_continuous",
    name: "Present Perfect Continuous",
    time: "PRESENT",
    aspect: "PERFECT CONTINUOUS",
    x: 57,
    y: 30,
    formula: "have / has been + V-ing",
    example: "Bjorn has been waiting for an hour.",
    translation: "Бьйорн ждёт уже час.",
    description: "An action that started earlier and has continued up to now."
  },
  {
    key: "future_perfect_continuous",
    name: "Future Perfect Continuous",
    time: "FUTURE",
    aspect: "PERFECT CONTINUOUS",
    x: 57,
    y: 70,
    formula: "will have been + V-ing",
    example: "By midnight, Bjorn will have been working for twelve hours.",
    translation: "К полуночи Бьйорн будет работать уже двенадцать часов.",
    description: "An action that will have continued for a duration up to a future point."
  }
];

// The visual positions above are intentionally slightly irregular.
// The point snaps to one of these twelve "stations", while the user can drag it freely.
const plane = document.getElementById("plane");
const orb = document.getElementById("orb");
const crosshair = document.getElementById("crosshair");
const coordinateReadout = document.getElementById("coordinateReadout");

const cardContent = document.querySelector(".card-content");
const indexEl = document.getElementById("index");
const categoryEl = document.getElementById("category");
const tenseNameEl = document.getElementById("tenseName");
const formulaEl = document.getElementById("formula");
const exampleEl = document.getElementById("example");
const translationEl = document.getElementById("translation");
const descriptionEl = document.getElementById("description");

let selectedIndex = 1;
let currentX = tenses[selectedIndex].x;
let currentY = tenses[selectedIndex].y;
let dragging = false;
let pointerId = null;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setPoint(x, y) {
  currentX = clamp(x, 8, 92);
  currentY = clamp(y, 8, 92);

  orb.style.left = `${currentX}%`;
  orb.style.top = `${currentY}%`;

  crosshair.style.left = `${currentX}%`;
  crosshair.style.top = `${currentY}%`;

  updateNearestPreview();
}

function nearestTense(x, y) {
  let bestIndex = 0;
  let bestDistance = Infinity;

  tenses.forEach((tense, index) => {
    const dx = x - tense.x;
    const dy = y - tense.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function updateNearestPreview() {
  const index = nearestTense(currentX, currentY);
  const tense = tenses[index];
  coordinateReadout.textContent = `${tense.time} · ${tense.aspect}`;
}

function lockToNearest() {
  const index = nearestTense(currentX, currentY);
  selectedIndex = index;

  const tense = tenses[index];
  setPoint(tense.x, tense.y);
  renderCard(tense, index);
}

function renderCard(tense, index) {
  cardContent.classList.remove("is-changing");
  void cardContent.offsetWidth;
  cardContent.classList.add("is-changing");

  indexEl.textContent = `${String(index + 1).padStart(2, "0")} / 12`;
  categoryEl.textContent = `${tense.time} · ${tense.aspect}`;
  tenseNameEl.textContent = tense.name;
  formulaEl.textContent = tense.formula;
  exampleEl.textContent = tense.example;
  translationEl.textContent = tense.translation;
  descriptionEl.textContent = tense.description;
}

function pointerToPercent(event) {
  const rect = plane.getBoundingClientRect();

  return {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  };
}

orb.addEventListener("pointerdown", (event) => {
  dragging = true;
  pointerId = event.pointerId;
  orb.setPointerCapture(pointerId);
  event.preventDefault();
});

orb.addEventListener("pointermove", (event) => {
  if (!dragging || event.pointerId !== pointerId) return;

  const point = pointerToPercent(event);
  setPoint(point.x, point.y);
});

orb.addEventListener("pointerup", (event) => {
  if (event.pointerId !== pointerId) return;
  dragging = false;
  pointerId = null;
  lockToNearest();
});

orb.addEventListener("pointercancel", () => {
  dragging = false;
  pointerId = null;
  lockToNearest();
});

// Clicking anywhere on the plane moves the point there and locks it.
plane.addEventListener("pointerdown", (event) => {
  if (event.target === orb || orb.contains(event.target)) return;

  const point = pointerToPercent(event);
  setPoint(point.x, point.y);
  lockToNearest();
});

function selectByIndex(index) {
  selectedIndex = (index + tenses.length) % tenses.length;
  const tense = tenses[selectedIndex];
  setPoint(tense.x, tense.y);
  renderCard(tense, selectedIndex);
}

document.getElementById("prevBtn").addEventListener("click", () => {
  selectByIndex(selectedIndex - 1);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  selectByIndex(selectedIndex + 1);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    selectByIndex(selectedIndex - 1);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    selectByIndex(selectedIndex + 1);
  }
});

// Initial state.
setPoint(tenses[selectedIndex].x, tenses[selectedIndex].y);
renderCard(tenses[selectedIndex], selectedIndex);
